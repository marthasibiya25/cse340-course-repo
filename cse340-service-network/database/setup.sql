CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    organization_id INT REFERENCES organization(organization_id)
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE project_category (
    project_id INT REFERENCES project(project_id),
    category_id INT REFERENCES category(category_id),
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO category (category_name)
VALUES
('Education'),
('Environment'),
('Community Support');

INSERT INTO organization (organization_name)
VALUES
('Helping Hands'),
('Green Earth Initiative');

INSERT INTO project (project_name, organization_id)
VALUES
('Community Teaching Program', 1),
('Tree Planting Project', 2);

INSERT INTO project_category (project_id, category_id)
VALUES
(1,1),
(1,2),
(2,3);

