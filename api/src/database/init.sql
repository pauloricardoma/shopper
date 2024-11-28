CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  car VARCHAR(255) NOT NULL,
  tax INT NOT NULL,
  min_distance INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rides (
  id SERIAL PRIMARY KEY,
  customer_id UUID NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  distance INT NOT NULL,
  duration VARCHAR(255) NOT NULL,
  driver_id INT NOT NULL,
  value INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_driver_id FOREIGN KEY (driver_id) REFERENCES drivers (id)
);

CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  driver_id INT NOT NULL,
  ride_id INT,
  customer_id UUID,
  value INT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_driver_id FOREIGN KEY (driver_id) REFERENCES drivers (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ride_id FOREIGN KEY (ride_id) REFERENCES rides (id),
  CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers (id)
);

CREATE INDEX idx_customer_id ON rides (customer_id);

DO $$
  BEGIN
    INSERT INTO customers (name) VALUES ('O Customer');
  END;
$$;

DO $$
  BEGIN
  INSERT INTO drivers (id, name, description, car, tax, min_distance)
  VALUES
    (1, 'Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 'Plymouth Valiant 1973 rosa e enferrujado', 250, 1),
    (2, 'Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 'Dodge Charger R/T 1970 modificado', 500, 5),
    (3, 'James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 'Aston Martin DB5 clássico', 1000, 10);
  END;
$$;

DO $$
  BEGIN
    INSERT INTO ratings (id, driver_id, value, description)
    VALUES
      (1, 1, 2, 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.'),
      (2, 2, 4, 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!'),
      (3, 3, 5, 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.');
    END;
$$;
