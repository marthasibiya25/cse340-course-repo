DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS organizations;
DROP TABLE IF EXISTS category;


CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(150) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    contact_email VARCHAR(150) NOT NULL,
    description TEXT NOT NULL
);


CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    organization_id INT NOT NULL REFERENCES organizations(organization_id)
);


CREATE TABLE project_category (
    project_category_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES category(category_id) ON DELETE CASCADE
);

INSERT INTO category (category_name)
VALUES
('Environment'),
('Education'),
('Community Support'),
('Healthcare');

INSERT INTO organizations
(organization_name, logo, contact_email, description)
VALUES
(
'Green Earth Foundation',
'/images/green-earth-logo.png',
'info@greenearth.org',
'An organization focused on protecting the environment through conservation projects.'
),
(
'Helping Hands Community',
'/images/helping-hands-logo.jpg',
'contact@helpinghands.org',
'Supporting community members through food, education, and outreach programs.'
),
(
'Youth Empowerment Network',
'/images/youth-empowerment-logo.webp',
'info@youthnetwork.org',
'Helping young people develop skills through educational and community programs.'
);

INSERT INTO projects
(project_name, description, location, date, organization_id)
VALUES

-- Green Earth Foundation (5 projects)

(
'Tree Planting Initiative',
'Planting trees to improve the environment.',
'Johannesburg',
'2026-07-01',
1
),

(
'River Cleanup Project',
'Cleaning rivers and removing waste from waterways.',
'Pretoria',
'2026-07-05',
1
),

(
'Recycling Awareness Campaign',
'Teaching communities about recycling practices.',
'Midrand',
'2026-07-12',
1
),

(
'Community Garden Project',
'Creating gardens to support sustainable food production.',
'Soweto',
'2026-07-18',
1
),

(
'Wildlife Protection Program',
'Protecting local wildlife and natural habitats.',
'Kruger Area',
'2026-07-25',
1
),


-- Helping Hands Community (5 projects)

(
'Community Food Drive',
'Providing food support to families in need.',
'Vanderbijlpark',
'2026-07-10',
2
),

(
'Clothing Donation Drive',
'Collecting clothing donations for families.',
'Johannesburg',
'2026-07-15',
2
),

(
'Healthcare Outreach',
'Providing basic healthcare support to communities.',
'Soweto',
'2026-07-20',
2
),

(
'Senior Support Program',
'Helping elderly community members.',
'Pretoria',
'2026-07-22',
2
),

(
'Community Support Workshop',
'Teaching life skills and community development.',
'Midrand',
'2026-07-28',
2
),


-- Youth Empowerment Network (5 projects)

(
'Youth Skills Workshop',
'Providing digital literacy and career readiness workshops.',
'Soweto',
'2026-07-20',
3
),

(
'Coding Bootcamp',
'Teaching programming skills to young people.',
'Johannesburg',
'2026-08-01',
3
),

(
'Career Preparation Program',
'Helping youth prepare for employment opportunities.',
'Pretoria',
'2026-08-05',
3
),

(
'Leadership Training',
'Developing leadership skills among young people.',
'Midrand',
'2026-08-10',
3
),

(
'Technology Access Program',
'Providing technology resources and training.',
'Vanderbijlpark',
'2026-08-15',
3
);

INSERT INTO project_category
(project_id, category_id)
VALUES

-- Green Earth Foundation projects
(1, 1), -- Tree Planting Initiative -> Environment
(2, 1), -- River Cleanup Project -> Environment
(3, 1), -- Recycling Awareness Campaign -> Environment
(4, 1), -- Community Garden Project -> Environment
(5, 1), -- Wildlife Protection Program -> Environment


-- Helping Hands Community projects
(6, 3), -- Community Food Drive -> Community Support
(7, 3), -- Clothing Donation Drive -> Community Support
(8, 4), -- Healthcare Outreach -> Healthcare
(9, 3), -- Senior Support Program -> Community Support
(10, 3), -- Community Support Workshop -> Community Support


-- Youth Empowerment Network projects
(11, 2), -- Youth Skills Workshop -> Education
(12, 2), -- Coding Bootcamp -> Education
(13, 2), -- Career Preparation Program -> Education
(14, 2), -- Leadership Training -> Education
(15, 2); -- Technology Access Program -> Education

