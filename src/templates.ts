import type { ResumeData } from "./common";

export type Template = (data: ResumeData) => string;

export const templates = {
  harshibar(data: ResumeData): string {
    return `
%-------------------------
% Resume in Latex
% Author : Harshibar
% Based off of: https://github.com/jakeryang/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
% only for pdflatex
% \\input{glyphtounicode}

% fontawesome
\\usepackage{fontawesome5}

% fixed width
\\usepackage[scale=0.90,lf]{FiraMono}

% light-grey
\\definecolor{light-grey}{gray}{0.83}
\\definecolor{dark-grey}{gray}{0.3}
\\definecolor{text-grey}{gray}{.08}

\\DeclareRobustCommand{\\ebseries}{\\fontseries{eb}\\selectfont}
\\DeclareTextFontCommand{\\texteb}{\\ebseries}

% custom underilne
\\usepackage{contour}
\\usepackage[normalem]{ulem}
\\renewcommand{\\ULdepth}{1.8pt}
\\contourlength{0.8pt}
\\newcommand{\\myuline}[1]{%
  \\uline{\\phantom{#1}}%
  \\llap{\\contour{white}{#1}}%
}


% custom font: helvetica-style
\\usepackage{tgheros}
\\renewcommand*\\familydefault{\\sfdefault}
%% Only if the base font of the document is to be sans serif
\\usepackage[T1]{fontenc}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{0in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting - serif
% \\titleformat{\\section}{
%   \\vspace{2pt} \\scshape \\raggedright\\large % header section
% }{}{0em}{}[\\color{black} \\titlerule \\vspace{-5pt}]

% TODO EBSERIES
% sans serif sections
\\titleformat {\\section}{
    \\bfseries \\vspace{2pt} \\raggedright \\large % header section
}{}{0em}{}[\\color{light-grey} {\\titlerule[2pt]} \\vspace{-4pt}]

% only for pdflatex
% Ensure that generate pdf is machine readable/ATS parsable
% \\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-1pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & {\\color{dark-grey}\\small #2}\\vspace{1pt}\\\\ % top row of resume entry
      \\textit{#3} & {\\color{dark-grey} \\small #4}\\\\ % second row of resume entry
    \\end{tabular*}\\vspace{-4pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
      #1 & {\\color{dark-grey}} \\\\
    \\end{tabular*}\\vspace{-4pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

% CHANGED default leftmargin  0.15 in
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{0pt}}

\\color{text-grey}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------

\\begin{center}
    \\textbf{${data.name}} \\\\ \\vspace{5pt}
    ${data.phone_number === undefined ? "" : `\\small \\faPhone* \\texttt{${data.phone_number}} \\hspace{1pt} $|$`} ${data.email === undefined ? "" : `\\hspace{1pt} \\faEnvelope \\hspace{2pt} \\texttt{${data.email}} \\hspace{1pt} $|$`} ${data.x === undefined ? "" : `\\hspace{1pt} \\faEnvelope \\hspace{2pt} \\texttt{${data.x}} \\hspace{1pt} $|$`} ${data.linkedin === undefined ? "" : `\\hspace{1pt} \\faEnvelope \\hspace{2pt} \\texttt{${data.linkedin}} \\hspace{1pt} $|$`} ${data.location === undefined ? "" : `\\hspace{1pt} \\faMapMarker* \\hspace{2pt}\\texttt{${data.location}}`}
    \\\\ \\vspace{-3pt}
\\end{center}

%----------- SUMMARY -----------

\\section{SUMMARY}
  \\begin{itemize}[leftmargin=0in, label={}]
  \\small{\\item{${data.summary}}}
  \\end{itemize}

%----------- SKILLS -----------

\\section{SKILLS}
  \\begin{itemize}[leftmargin=0in, label={}]
    \\small{\\item{
    ${data.skills
      .map(
        (skill) => `
        \\textbf{${skill.label}:} {${skill.description}}
    `,
      )
      .join("\\vspace{2pt} \\\\")}
    }}
  \\end{itemize}

%-----------EXPERIENCE-----------

\\section{EXPERIENCE}
  \\resumeSubHeadingListStart

    ${data.experiences
      .map(
        (experience) => `
    \\resumeSubheading
      {${experience.company}}{${experience.time}}
      {${experience.job}}{${experience.location}}
      \\resumeItemListStart
        ${experience.details
          .map(
            (detail) => `
        \\resumeItem{${detail}}
        `,
          )
          .join("\n")}
      \\resumeItemListEnd
    `,
      )
      .join("\n")}

  \\resumeSubHeadingListEnd

%-----------EDUCATION-----------

\\section {EDUCATION}
  \\resumeSubHeadingListStart

    ${data.education
      .map(
        (education) => `
    \\resumeSubheading
      {${education.school}}{${education.time}}
      {${education.degree}}{${education.location}}
       	\\resumeItemListStart
       	${education.details
          .map(
            (detail) => `
        \\resumeItem {${detail}}
        `,
          )
          .join("\n")}
        \\resumeItemListEnd
    `,
      )
      .join("\n")}

  \\resumeSubHeadingListEnd

%-------------------------------------------
\\end{document}
    `;
  },

  elegant(data: ResumeData): string {
    return `
% This template is designed to offer an aesthetically pleasing resume that adheres to a formal and institutional tone, making it suitable for applications to companies and research centers requiring a high degree of professionalism. Navy blue has been chosen as the primary color to align with these objectives.
% The code is well-documented and annotated, allowing users to easily customize and modify it according to their needs. Please note that the template's content is meant to be humorous and should not be taken literally. We are grateful for your interest in using this template for your professional endeavors.
% Author: Christian Maria Giannetti

%----------------------------------------------------------------------------------------
%  Packages And Other Document Configurations
%----------------------------------------------------------------------------------------

\\documentclass{resume} % Use the custom resume.cls style

% Document margins
\\usepackage[left=0.75in,top=0.6in,right=0.75in,bottom=0.6in]{geometry}

% Color and hyperlink packages
\\usepackage{xcolor}
\\usepackage{hyperref}

% Footnote and margin adjustment packages
\\usepackage{footnote}
\\usepackage{changepage}

% Fontawesome package for icons
\\usepackage{fontawesome}

% Tabularx package for custom tables
\\usepackage{tabularx}

% Define navyblue color
% \\definecolor{navyblue}{RGB}{75, 143, 156}
% \\definecolor{navyblue}{RGB}{42, 128, 145}
% \\definecolor{navyblue}{RGB}{8, 138, 163}
\\definecolor{navyblue}{RGB}{1, 58, 69}


%----------------------------------------------------------------------------------------
%   Customizations
%----------------------------------------------------------------------------------------

% Define italicitem, bolditem, and plainitem commands
\\newcommand{\\italicitem}[1]{\\item{\\textit{#1}}}
\\newcommand{\\bolditem}[1]{\\item{\\textbf{#1}}}
\\newcommand{\\plainitem}[1]{\\item{#1}}

% Define user-friendly link command for hyperlinks
\\newcommand{\\link}[2]{{\\href{#1}{#2}}}

\\newcommand{\\entry}[2]{#1 & #2 \\tabularnewline} % Defines an entry with two arguments: #1 for the first column and #2 for the second column

%----------------------------------------------------------------------------------------
%   Define envsection command for defining a new environment section
%----------------------------------------------------------------------------------------

\\newcommand{\\tableEnv}[2]{%
  \\begin{rSection}{#1} % Begin rSection with the given name
    \\begin{adjustwidth}{0.0in}{0.1in} % Set the left and right margins
      \\begin{tabularx}{\\linewidth}{@{} >{\\bfseries}l @{\\hspace{6ex}} X @{}}
        #2 % Print the content inside the tabularx environment
      \\end{tabularx}
    \\end{adjustwidth}
  \\end{rSection}
}

%----------------------------------------------------------------------------------------
%   Begin document
%----------------------------------------------------------------------------------------

% Set name with navyblue color
\\name{\\color{navyblue} ${data.name}}

\\begin{document}

\\printPersonalInfo{
  \\personalInfo{\\tag{Residence}\\info{${data.location}}}
  \\personalInfo{\\tag{Email}\\info{${data.email}} \\infoSeparator \\tag{Phone}\\info{${data.phone_number}}}
  \\personalInfo{\\tag{LinkedIn}\\info{${data.linkedin.replace("in/", "")}}}
}


%----------------------------------------------------------------------------------------
%   Summary
%----------------------------------------------------------------------------------------

\\begin{rSection}{Summary}

  ${data.summary}

\\end{rSection}

%----------------------------------------------------------------------------------------
%   Work experience section
%----------------------------------------------------------------------------------------

\\begin{rSection}{Work experience}

    ${data.experiences
      .map(
        (experience) => `
        \\begin{rSubsection}{${experience.company}}{${experience.time}}{${experience.job}}{${experience.location}}
            ${experience.details
              .map(
                (detail) => `
              \\item ${detail}.
              `,
              )
              .join("\n")}
        \\end{rSubsection}
    `,
      )
      .join("\n")}

\\end{rSection}

%----------------------------------------------------------------------------------------
%   Education section
%----------------------------------------------------------------------------------------

\\begin{rSection}{Education}

    ${data.education
      .map(
        (education) => `
      \\begin{rSubsectionNoBullet}{\\bf ${education.school}}{${education.time}}{${education.degree}}{${education.location}}
          ${education.details
            .map(
              (detail) => `
            \\italicitem{${detail}}
            `,
            )
            .join("\n")}
      \\end{rSubsectionNoBullet}
    `,
      )
      .join("\n")}

\\end{rSection}

%----------------------------------------------------------------------------------------
% Skills
%----------------------------------------------------------------------------------------

\\tableEnv{Skills}{
    ${data.skills
      .map(
        (skill) => `
      \\entry{${skill.label}}{${skill.description}}
      `,
      )
      .join("\n")}
}

%----------------------------------------------------------------------------------------
% Miscellaneous
%----------------------------------------------------------------------------------------

\\tableEnv{Miscellaneous}{
    ${data.miscellaneous
      .map(
        (misc) => `
      \\entry{${misc.label}}{${misc.description}}
    `,
      )
      .join("\n")}
}

\\end{document}
`;
  },
};
