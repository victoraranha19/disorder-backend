
-- Tabela usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(48) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nomeCompleto VARCHAR(255),
    emailContato VARCHAR(255),
    telefoneContato VARCHAR(48),
    chavePix VARCHAR(255),
    idConsultor INTEGER CHECK (idConsultor IS NULL OR idConsultor <> id),
    restricoesConsultor VARCHAR(255),
    ehConsultor BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (idConsultor) REFERENCES usuarios(id),
);

-- Tabela categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(48) NOT NULL,
    valorMes DECIMAL(10, 2) NOT NULL CHECK (valorMes >= 0),
    idUsuario INTEGER NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

-- Tabela carteiras
CREATE TABLE carteiras (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(48) NOT NULL,
    valorNaConta DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (valorNaConta >= 0),
    limiteCreditoTotal DECIMAL(10, 2) CHECK (limiteCreditoTotal >= 0),
    idUsuario INTEGER NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

-- Tabela transacoes
CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255)  NOT NULL,
    valor DECIMAL(10, 2) NOT NULL CHECK (valor <> 0),
    dataTransacao DATE NOT NULL,
    tipo CHAR(1) NOT NULL, -- 'C' ou 'D' (para crédito ou débito)
    idCategoria INTEGER,
    idCarteira INTEGER,
    idUsuario INTEGER NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (idCategoria) REFERENCES categorias(id),
    FOREIGN KEY (idCarteira) REFERENCES carteiras(id),
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

