CREATE DATABASE api;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT * FROM pg_available_extensions;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);
INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');

CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID ,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO todos (user_id,description) VALUES ('b074db3c-3db8-4e71-9850-3271528a9eb4','Hello');



--heroku addons:create heroku-postgresql:hobby-dev
-- heroku pg:info
-- heroku pg:psql