from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "marek-smatana-cv.pdf"
PROFILE_IMAGE = ROOT / "public" / "profile.jpg"
FONT_DIR = Path(
    "/Users/marek/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/"
    "libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype"
)

INK = colors.HexColor("#1c1f1c")
SOFT = colors.HexColor("#565c58")
MUTED = colors.HexColor("#737a74")
LINE = colors.HexColor("#d9dfd8")
CANVAS = colors.HexColor("#f6f7f4")
DARK = colors.HexColor("#09090b")
LEAF = colors.HexColor("#3a7e4f")
EMBER = colors.HexColor("#bc4e34")
RIVER = colors.HexColor("#347c8e")
WHITE = colors.white


def register_fonts() -> tuple[str, str]:
    regular = FONT_DIR / "DejaVuSans.ttf"
    bold = FONT_DIR / "DejaVuSans-Bold.ttf"
    pdfmetrics.registerFont(TTFont("CVSans", str(regular)))
    pdfmetrics.registerFont(TTFont("CVSans-Bold", str(bold)))
    return "CVSans", "CVSans-Bold"


FONT, FONT_BOLD = register_fonts()


def cropped_profile() -> BytesIO:
    image = PILImage.open(PROFILE_IMAGE).convert("RGB")
    width, _height = image.size
    crop_size = min(width, 720)
    left = max(0, (width - crop_size) // 2)
    top = 70
    cropped = image.crop((left, top, left + crop_size, top + crop_size))
    buffer = BytesIO()
    cropped.save(buffer, format="JPEG", quality=88)
    buffer.seek(0)
    return buffer


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="Name",
        fontName=FONT_BOLD,
        fontSize=29,
        leading=31,
        textColor=WHITE,
        spaceAfter=5,
    )
)
styles.add(
    ParagraphStyle(
        name="Role",
        fontName=FONT,
        fontSize=10.8,
        leading=15,
        textColor=colors.HexColor("#d8ded8"),
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="Contact",
        fontName=FONT,
        fontSize=8.8,
        leading=12,
        textColor=colors.HexColor("#eef3ef"),
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        fontName=FONT_BOLD,
        fontSize=10.7,
        leading=13,
        textColor=LEAF,
        uppercase=True,
        spaceBefore=6,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        fontName=FONT,
        fontSize=8.7,
        leading=12,
        textColor=SOFT,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyDark",
        parent=styles["Body"],
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="Small",
        fontName=FONT,
        fontSize=7.7,
        leading=10.3,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="TitleLine",
        fontName=FONT_BOLD,
        fontSize=9.8,
        leading=12,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="Period",
        fontName=FONT_BOLD,
        fontSize=7.7,
        leading=10,
        textColor=MUTED,
        alignment=TA_CENTER,
    )
)
styles.add(
    ParagraphStyle(
        name="BulletLine",
        fontName=FONT,
        fontSize=8.1,
        leading=10.7,
        textColor=SOFT,
        spaceBefore=1.2,
    )
)
styles.add(
    ParagraphStyle(
        name="CardTitle",
        fontName=FONT_BOLD,
        fontSize=8.7,
        leading=11,
        textColor=INK,
        spaceAfter=2,
    )
)


def para(text: str, style: str = "Body") -> Paragraph:
    return Paragraph(text, styles[style])


def section(title: str) -> Paragraph:
    return para(title.upper(), "Section")


def bullets(items: list[str]) -> list[Paragraph]:
    return [
        para(f'<font color="#3a7e4f">•</font>&nbsp;&nbsp;{item}', "BulletLine")
        for item in items
    ]


def card(content: list, bg=colors.white, border=LINE, padding=8) -> Table:
    table = Table([[content]], colWidths=[None])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("BOX", (0, 0), (-1, -1), 0.55, border),
                ("LEFTPADDING", (0, 0), (-1, -1), padding),
                ("RIGHTPADDING", (0, 0), (-1, -1), padding),
                ("TOPPADDING", (0, 0), (-1, -1), padding),
                ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
            ]
        )
    )
    return table


def header_block(width: float) -> Table:
    photo = Image(cropped_profile(), width=28 * mm, height=28 * mm)
    intro = [
        para("React | React Native | TypeScript | Product engineering", "Small"),
        para("Marek Smatana, Ing.", "Name"),
        para(
            "Product-minded software engineer building fast React experiences, "
            "high-traffic acquisition pages, and mobile apps with clean UX.",
            "Role",
        ),
        para(
            '<link href="mailto:smat.marek@gmail.com"><font color="#eef3ef">smat.marek@gmail.com</font></link>'
            "",
            "Contact",
        ),
    ]
    table = Table([[intro, photo]], colWidths=[width - 34 * mm, 28 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), DARK),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (0, 0), 13),
                ("RIGHTPADDING", (0, 0), (0, 0), 13),
                ("TOPPADDING", (0, 0), (0, 0), 13),
                ("BOTTOMPADDING", (0, 0), (0, 0), 13),
                ("LEFTPADDING", (1, 0), (1, 0), 0),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (1, 0), (1, 0), 10),
                ("BOTTOMPADDING", (1, 0), (1, 0), 10),
            ]
        )
    )
    return table


def skills_block(width: float) -> Table:
    skills = [
        "React",
        "TypeScript",
        "JavaScript",
        "React Native",
        "Tailwind CSS",
        "SCSS",
        "Jest",
        "Testing Library",
        "SEO",
        "A/B testing",
        "CI/CD",
        "GraphQL",
        "Git",
    ]
    rows = []
    for i in range(0, len(skills), 3):
        rows.append([para(skill, "Small") for skill in skills[i : i + 3]])
        while len(rows[-1]) < 3:
            rows[-1].append("")
    table = Table(rows, colWidths=[width / 3] * 3, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.4, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    return table


def ai_block(width: float) -> Table:
    items = [
        [
            para("AI coding assistants", "CardTitle"),
            para(
                "Daily use of ChatGPT, Codex, and Claude for development, reviews, debugging, architecture discussions, and rapid prototyping.",
                "Small",
            ),
        ],
        [
            para("OpenAI API integration", "CardTitle"),
            para(
                "Integrated OpenAI API into a React Native app to generate personalized workout plans and training insights.",
                "Small",
            ),
        ],
        [
            para("Pragmatic adoption", "CardTitle"),
            para(
                "Follows AI tooling trends and uses them to boost productivity while keeping engineering judgment and ownership of final implementation.",
                "Small",
            ),
        ],
    ]
    table = Table([items], colWidths=[width / 3 - 4] * 3)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.45, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def experience_item(
    company: str,
    role: str,
    period: str,
    project: str,
    technologies: str,
    highlights: list[str],
) -> KeepTogether:
    header = Table(
        [
            [
                para(f"{company} - {role}", "TitleLine"),
                para(period, "Period"),
            ]
        ],
        colWidths=[118 * mm, 34 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    content = [
        header,
        para(f"<b>{project}</b> | {technologies}", "Small"),
    ] + bullets(highlights)
    return KeepTogether([card(content, bg=colors.white, border=LINE, padding=7), Spacer(1, 4)])


def two_col(left: list, right: list, width: float) -> Table:
    table = Table([[left, right]], colWidths=[width * 0.58, width * 0.42])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont(FONT, 7.4)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 9 * mm, "Marek Smatana | smat.marek@gmail.com")
    canvas.drawRightString(A4[0] - 18 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def build_story(doc_width: float) -> list:
    story = [header_block(doc_width), Spacer(1, 8)]

    profile = [
        section("Profile"),
        para(
            "I work across <b>React, TypeScript, React Native, testing, SEO optimization, and performance</b>. "
            "Recent work centers on Omio's organic acquisition experience, where page quality, speed, and experimentation "
            "directly affect business outcomes. Outside client work I build mobile products under Build It Studio, "
            "including Breathe It and a workout app preparing for release.",
            "Body",
        ),
    ]
    right_col_width = doc_width * 0.42 - 8
    skills = [section("Core skills"), skills_block(right_col_width - 16)]
    story.append(two_col([card(profile)], [card(skills)], doc_width))
    story += [Spacer(1, 8), section("AI-assisted engineering"), ai_block(doc_width), Spacer(1, 8)]

    story.append(section("Experience"))
    story.append(
        experience_item(
            "CODERAMA, s.r.o.",
            "Medior Software Engineer",
            "Mar 2024 - Present",
            "Omio",
            "React, TypeScript, SCSS, React Native, Jest, Testing Library, SEO, A/B testing",
            [
                "Developed and maintained high-traffic landing pages for Omio's Organic Acquisition team.",
                "Implemented and evaluated A/B experiments focused on acquisition, engagement, and conversion rates.",
                "Improved automated test coverage from a low baseline to over 80% while reducing technical debt.",
                "Optimized Core Web Vitals and diagnosed hydration issues, browser-specific rendering problems, and production defects.",
            ],
        )
    )
    story.append(
        experience_item(
            "Sudolabs",
            "Medior Software Engineer",
            "Jul 2022 - Mar 2024",
            "Finviz",
            "React, TypeScript, JavaScript, C#, ASP.NET Razor Pages, MSSQL",
            [
                "Worked on a widely used financial market analysis platform for screening, visualization, charting, and trading workflows.",
                "Modernized legacy code, implemented new charting functionality, and improved maintainability and scalability.",
                "Developed and maintained frontend and server-side components, including database-related support when required.",
            ],
        )
    )
    story.append(PageBreak())
    story.append(section("Experience continued"))
    story.append(
        experience_item(
            "Sudolabs",
            "Medior Software Engineer",
            "Apr 2022 - Jul 2022",
            "GEAM",
            "React, TypeScript, Apollo GraphQL, Chakra UI, Tailwind CSS, Storybook",
            [
                "Helped build a greenfield insurance risk assessment application for UNIQA.",
                "Contributed to frontend architecture, reusable foundations, table editing, validation, state management, exports, and GraphQL integration.",
            ],
        )
    )
    story.append(
        experience_item(
            "Quest Software",
            "Junior JavaScript Developer",
            "Nov 2021 - Mar 2022",
            "Internal web applications",
            "AngularJS, React.js, JavaScript",
            [
                "Built and maintained user interfaces for internal web applications using AngularJS.",
                "Reworked React.js code into AngularJS and collaborated with globally distributed engineers.",
            ],
        )
    )
    story.append(
        experience_item(
            "UNICORN Slovakia",
            "Junior JavaScript Developer",
            "Mar 2021 - Nov 2021",
            "Internal web applications",
            "React.js, JavaScript, unit testing",
            [
                "Built internal web application interfaces and wrote server-side JavaScript based on prepared documentation.",
                "Created full unit test coverage for newly delivered code.",
            ],
        )
    )

    products = [
        section("Own products"),
        card(
            [
                para("Breathe It - Published mobile app", "CardTitle"),
                para(
                    "Guided breathing app focused on calm, focus, and relaxation through simple sessions, visual and audio guidance, customizable durations, and saved favorites.",
                    "Small",
                ),
                Spacer(1, 4),
                para("React Native | Wellness | Mobile UX | Product design", "Small"),
                Spacer(1, 3),
                para(
                    '<link href="https://buildit.studio/breatheit"><font color="#3a7e4f">buildit.studio/breatheit</font></link>',
                    "Small",
                ),
            ],
            padding=7,
        ),
        Spacer(1, 5),
        card(
            [
                para("Workout app - In development", "CardTitle"),
                para(
                    "Mobile training product designed around practical workout flows, useful progress feedback, personalized workout plans, and training insights.",
                    "Small",
                ),
                Spacer(1, 4),
                para("React Native | Fitness | OpenAI API | Launch prep", "Small"),
            ],
            padding=7,
        ),
    ]
    side = [
        section("Education"),
        card(
            [
                para("University of Žilina", "CardTitle"),
                para("Faculty of Management Science and Informatics", "Small"),
                para("Ing. - Engineer's degree | 2017 - 2021", "Small"),
            ],
            padding=7,
        ),
        Spacer(1, 6),
        section("Strengths"),
        card(
            [
                para("Frontend delivery", "CardTitle"),
                para("Maintainable React and TypeScript interfaces with readable architecture and reusable UI.", "Small"),
                Spacer(1, 4),
                para("Growth engineering", "CardTitle"),
                para("High-traffic SEO pages, A/B experiments, Core Web Vitals, and conversion-focused product work.", "Small"),
                Spacer(1, 4),
                para("Product ownership", "CardTitle"),
                para("Comfortable shaping features from discovery through implementation, testing, release, and production follow-up.", "Small"),
            ],
            padding=7,
        ),
        Spacer(1, 6),
        section("Work style & personality"),
        card(
            [
                para(
                    "I do not run from challenges. I like difficult tasks, breaking them down with team, and seeing them through responsibly. I enjoy teamwork, open communication, and sharing context so the team can move faster together. People can rely on me to follow through, be prepared, and care about the quality of what I deliver.",
                    "Small",
                ),
                Spacer(1, 5),
                para(
                    "Outside work, I enjoy listening to rock and power metal like Kabát, Avantasia and Sabaton, I love playing modded Minecraft, Terraria and Megabonk.",
                    "Small",
                ),
                Spacer(1, 5),
                para(
                    "In my free time I build side projects where design, calm UX, and practical utility meet.",
                    "Small",
                )
            ],
            padding=7,
        ),
    ]
    story.append(Spacer(1, 4))
    story.append(two_col(products, side, doc_width))
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=15 * mm,
        title="Marek Smatana CV",
        author="Marek Smatana",
    )
    doc.build(build_story(doc.width), onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    main()
