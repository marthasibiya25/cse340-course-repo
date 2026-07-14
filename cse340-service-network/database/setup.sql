CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);


CREATE TABLE project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO category (category_name)
VALUES
('Environment'),
('Education'),
('Community Support');

INSERT INTO project_category (project_id, category_id)
VALUES
(1,1),
(2,2),
(3,3);