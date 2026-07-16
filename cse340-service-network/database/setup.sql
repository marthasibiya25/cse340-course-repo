DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS organizations;
DROP TABLE IF EXISTS category;


CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);


CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(150) NOT NULL,
    logo VARCHAR(255),
    contact_email VARCHAR(150),
    description TEXT
);


CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(150),
    date DATE,
    category_id INT REFERENCES category(category_id),
    organization_id INT REFERENCES organizations(organization_id)
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
'/images/green-earth.png',
'info@greenearth.org',
'An organization focused on protecting the environment.'
),
(
'Helping Hands Community',
'/images/helping-hands.png',
'contact@helpinghands.org',
'Supporting community members through service projects.'
);


INSERT INTO projects
(project_name, description, location, date, category_id, organization_id)
VALUES
(
'Tree Planting Initiative',
'Planting trees to improve the environment.',
'Johannesburg',
'2026-07-01',
1,
1
),
(
'Community Food Drive',
'Providing food support to families in need.',
'Vanderbijlpark',
'2026-07-10',
3,
2
);
