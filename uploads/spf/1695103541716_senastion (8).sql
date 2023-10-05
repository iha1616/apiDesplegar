-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2023 at 08:16 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `senastion`
--

-- --------------------------------------------------------

--
-- Table structure for table `acceso`
--

CREATE TABLE `acceso` (
  `idAcceso` int(11) NOT NULL,
  `documento` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `idUsuarioAprendiz` int(11) NOT NULL,
  `tablaAcceso` int(11) NOT NULL,
  `forgotPassword` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `acceso`
--

INSERT INTO `acceso` (`idAcceso`, `documento`, `password`, `idUsuarioAprendiz`, `tablaAcceso`, `forgotPassword`) VALUES
(1, 1034987348, '$2a$10$GGOeWHYzd/mlbFEs0EZjyuj3uUEwLw1cku.aDWy8S4saDM.yWOaHm', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `aprendices`
--

CREATE TABLE `aprendices` (
  `idAprendiz` int(11) NOT NULL,
  `documento` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` bigint(20) NOT NULL,
  `estadoAprendiz` int(11) NOT NULL DEFAULT 1,
  `idTipoDocumento` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idFicha` int(11) DEFAULT NULL,
  `idGrupoProyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comite`
--

CREATE TABLE `comite` (
  `idComite` int(11) NOT NULL,
  `fechaHoraInicio` datetime NOT NULL,
  `fechaHoraFin` datetime NOT NULL,
  `codigoComite` bigint(20) NOT NULL,
  `estadoComite` int(11) NOT NULL DEFAULT 0,
  `link` varchar(255) DEFAULT NULL,
  `acta` varchar(255) DEFAULT NULL,
  `resolucion` varchar(255) DEFAULT NULL,
  `idProgramaCoordinacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `competencias`
--

CREATE TABLE `competencias` (
  `idCompetencia` int(11) NOT NULL,
  `nombreCompetencia` varchar(255) NOT NULL,
  `codigoCompetencia` bigint(20) NOT NULL,
  `idProgramaFormativo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `decision_comite`
--

CREATE TABLE `decision_comite` (
  `idDecision` int(11) NOT NULL,
  `nombreDecision` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `decision_comite`
--

INSERT INTO `decision_comite` (`idDecision`, `nombreDecision`) VALUES
(1, 'Ninguna'),
(2, 'Plan Mejoramiento'),
(3, 'Cancelación'),
(4, 'Plan de Mejoramiento con Condicionamiento'),
(5, 'Otro');

-- --------------------------------------------------------

--
-- Table structure for table `entrega_ficha`
--

CREATE TABLE `entrega_ficha` (
  `idEntregaFicha` int(11) NOT NULL,
  `observacionFicha` varchar(255) NOT NULL,
  `trimestre` int(11) NOT NULL,
  `fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `idUsuario` int(11) NOT NULL,
  `idFicha` int(11) NOT NULL,
  `idCompetencia` int(11) NOT NULL,
  `idResultadoAprendizaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `estado_decision`
--

CREATE TABLE `estado_decision` (
  `idEstadoDecision` int(11) NOT NULL,
  `nombreEstadoDecision` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estado_decision`
--

INSERT INTO `estado_decision` (`idEstadoDecision`, `nombreEstadoDecision`) VALUES
(1, 'Aprobado'),
(2, 'No Aprobado');

-- --------------------------------------------------------

--
-- Table structure for table `estado_quejas`
--

CREATE TABLE `estado_quejas` (
  `idEstadoQuejas` int(11) NOT NULL,
  `nombreEstadoQuejas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estado_quejas`
--

INSERT INTO `estado_quejas` (`idEstadoQuejas`, `nombreEstadoQuejas`) VALUES
(1, 'Sin Completar'),
(2, 'Listado'),
(3, 'Citado'),
(4, 'En Proceso'),
(5, 'Finalizado');

-- --------------------------------------------------------

--
-- Table structure for table `fichas`
--

CREATE TABLE `fichas` (
  `idFicha` int(11) NOT NULL,
  `codigoFicha` bigint(20) NOT NULL,
  `voceroFicha` varchar(255) DEFAULT NULL,
  `idProgramaFormativo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ficha_usuarios`
--

CREATE TABLE `ficha_usuarios` (
  `idFichaUsuario` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idFicha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `motivos_comite`
--

CREATE TABLE `motivos_comite` (
  `idMotivoComite` int(11) NOT NULL,
  `nombreMotivo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `motivos_comite`
--

INSERT INTO `motivos_comite` (`idMotivoComite`, `nombreMotivo`) VALUES
(1, 'No Aplica'),
(2, 'Bajo Rendimiento'),
(3, 'Deserción'),
(4, 'Falta Disciplinaria'),
(5, 'Felicitaciones');

-- --------------------------------------------------------

--
-- Table structure for table `observaciones_aprendiz`
--

CREATE TABLE `observaciones_aprendiz` (
  `idObservacionAprendiz` int(11) NOT NULL,
  `trimestre` int(11) NOT NULL,
  `fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `ObservacionAprendiz` varchar(255) NOT NULL,
  `idAprendiz` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idEstadoDecision` int(11) NOT NULL,
  `idCompetencia` int(11) NOT NULL,
  `idResultadoAprendizaje` int(11) NOT NULL,
  `idEntregaFicha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `permisos`
--

CREATE TABLE `permisos` (
  `idPermiso` int(11) NOT NULL,
  `modulo` varchar(255) NOT NULL,
  `subModulo` varchar(255) NOT NULL,
  `nombrePermiso` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permisos`
--

INSERT INTO `permisos` (`idPermiso`, `modulo`, `subModulo`, `nombrePermiso`, `link`) VALUES
(1, 'Configuración', 'Programas Formativos', 'All', 'gestion'),
(2, 'Configuración', 'Administrador', 'All', 'administrador'),
(3, 'Configuración', 'Coordinación Académica', 'All', 'programaCoordinacion'),
(4, 'Configuración', 'Roles y Permisos', 'All', 'roles'),
(5, 'Usuarios', 'Usuarios', 'All', 'usuarios'),
(6, 'Usuarios', 'Aprendices', 'All', 'aprendices'),
(7, 'Gestión de Fichas', 'Fichas', 'Access', 'fichas'),
(8, 'Gestión de Fichas', 'Fichas', 'Crear', NULL),
(9, 'Gestión de Fichas', 'Fichas', 'Asignar', NULL),
(10, 'Gestión de Fichas', 'Fichas', 'Consultar', NULL),
(11, 'Gestión de Fichas', 'Fichas', 'Editar', NULL),
(12, 'Gestión de Fichas', 'Fichas', 'Cambiar Vocero', NULL),
(13, 'Gestión de Fichas', 'Fichas', 'Crear GP', NULL),
(14, 'Gestión de Fichas', 'Fichas', 'Hacer Entrega', NULL),
(15, 'Gestión de Fichas', 'Fichas', 'Ver Entregas', NULL),
(16, 'Gestión de Fichas', 'Proyectos Formativos', 'Access', 'proyectosFormativos'),
(17, 'Gestión de Fichas', 'Proyectos Formativos', 'Subir Archivo', NULL),
(18, 'Gestión de Fichas', 'Proyectos Formativos', 'Editar', NULL),
(19, 'Comité de Evaluación', 'Quejas Comité', 'Access', 'quejasComite'),
(20, 'Comité de Evaluación', 'Quejas Comité', 'Crear', NULL),
(21, 'Comité de Evaluación', 'Quejas Comité', 'Revertir', NULL),
(22, 'Comité de Evaluación', 'Quejas Comité', 'Bot', NULL),
(23, 'Comité de Evaluación', 'Quejas Comité', 'Editar', NULL),
(24, 'Comité de Evaluación', 'Comité', 'Access', 'comite'),
(25, 'Comité de Evaluación', 'Comité', 'Crear', NULL),
(26, 'Comité de Evaluación', 'Comité', 'Editar', NULL),
(27, 'Comité de Evaluación', 'Comité', 'Comenzar', NULL),
(28, 'Comité de Evaluación', 'Comité', 'Finalizar', NULL),
(29, 'Comité de Evaluación', 'Comité', 'Actualizar', NULL),
(30, 'Comité de Evaluación', 'Comité', 'Consultar', NULL),
(31, 'Comité de Evaluación', 'Plan de Mejoramiento', 'Access', 'planMejoramiento'),
(32, 'Comité de Evaluación', 'Plan de Mejoramiento', 'Finalizar', NULL),
(33, 'Comité de Evaluación', 'Plan de Mejoramiento', 'Consultar', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `plan_mejoramiento`
--

CREATE TABLE `plan_mejoramiento` (
  `idPlanMejoramiento` int(11) NOT NULL,
  `trimestre` int(11) NOT NULL,
  `archivoPlanMejoramiento` varchar(255) DEFAULT NULL,
  `descripcionMotivo` varchar(255) DEFAULT NULL,
  `IdQueja` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idAprendiz` int(11) NOT NULL,
  `idEstadoDecision` int(11) DEFAULT NULL,
  `idMotivoComite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `programas_formativos`
--

CREATE TABLE `programas_formativos` (
  `idProgramaFormativo` int(11) NOT NULL,
  `nombrePF` varchar(255) NOT NULL,
  `abreviaturaPF` varchar(255) NOT NULL,
  `codigoPF` bigint(20) NOT NULL,
  `trimestres` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `programa_coordinacion`
--

CREATE TABLE `programa_coordinacion` (
  `idPCA` int(11) NOT NULL,
  `idProgramaFormativo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `quejas_comite`
--

CREATE TABLE `quejas_comite` (
  `idQueja` int(11) NOT NULL,
  `archivoQueja` blob DEFAULT NULL,
  `trimestre` int(11) NOT NULL,
  `descripcionMotivo` varchar(255) NOT NULL,
  `otraDecision` varchar(255) DEFAULT NULL,
  `asisteComite` tinyint(4) DEFAULT 0,
  `otrosInstructores` varchar(255) DEFAULT NULL,
  `idAprendiz` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idMotivoComite` int(11) NOT NULL,
  `idEstadoQueja` int(11) NOT NULL,
  `idComite` int(11) DEFAULT NULL,
  `idDecisionComite` int(11) DEFAULT NULL,
  `idCompetencia` int(11) NOT NULL,
  `idResultadoAprendizaje` int(11) NOT NULL,
  `idObservacionAprendiz` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `resultado_aprendizaje`
--

CREATE TABLE `resultado_aprendizaje` (
  `idResultadoAprendizaje` int(11) NOT NULL,
  `nombreRA` varchar(255) NOT NULL,
  `codigoRA` bigint(20) NOT NULL,
  `IdCompetencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`) VALUES
(1, 'Administrador'),
(5, 'Coordinador');

-- --------------------------------------------------------

--
-- Table structure for table `roles_permisos`
--

CREATE TABLE `roles_permisos` (
  `idRolPermiso` int(11) NOT NULL,
  `idRol` int(11) DEFAULT NULL,
  `idPermiso` int(11) DEFAULT NULL,
  `access` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles_permisos`
--

INSERT INTO `roles_permisos` (`idRolPermiso`, `idRol`, `idPermiso`, `access`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1),
(5, 1, 5, 1),
(6, 1, 6, 1),
(7, 1, 7, 1),
(8, 1, 8, 0),
(9, 1, 9, 0),
(10, 1, 10, 0),
(11, 1, 11, 0),
(12, 1, 12, 0),
(13, 1, 13, 0),
(14, 1, 14, 0),
(15, 1, 15, 0),
(16, 1, 16, 0),
(17, 1, 17, 0),
(18, 1, 18, 0),
(19, 1, 19, 0),
(20, 1, 20, 0),
(21, 1, 21, 0),
(22, 1, 22, 0),
(23, 1, 23, 0),
(24, 1, 24, 0),
(25, 1, 25, 0),
(26, 1, 26, 0),
(27, 1, 27, 0),
(28, 1, 28, 0),
(29, 1, 29, 0),
(30, 1, 30, 0),
(31, 1, 31, 0),
(32, 1, 32, 0),
(33, 1, 33, 0),
(133, 5, 1, 1),
(134, 5, 2, 1),
(135, 5, 3, 1),
(136, 5, 5, 1),
(137, 5, 4, 1),
(138, 5, 6, 1),
(139, 5, 9, 0),
(140, 5, 7, 1),
(141, 5, 8, 0),
(142, 5, 10, 0),
(143, 5, 11, 0),
(144, 5, 12, 0),
(145, 5, 13, 0),
(146, 5, 14, 0),
(147, 5, 16, 0),
(148, 5, 15, 0),
(149, 5, 17, 0),
(150, 5, 18, 0),
(151, 5, 19, 1),
(152, 5, 20, 0),
(153, 5, 21, 0),
(154, 5, 22, 0),
(155, 5, 23, 0),
(156, 5, 24, 1),
(157, 5, 25, 0),
(158, 5, 26, 0),
(159, 5, 27, 0),
(160, 5, 28, 0),
(161, 5, 29, 0),
(162, 5, 30, 0),
(163, 5, 31, 0),
(164, 5, 32, 0),
(165, 5, 33, 0);

-- --------------------------------------------------------

--
-- Table structure for table `spf_archivos_proyecto`
--

CREATE TABLE `spf_archivos_proyecto` (
  `idArchivosProyecto` int(11) NOT NULL,
  `archivoProyecto` blob NOT NULL,
  `nombreArchivo` varchar(255) NOT NULL,
  `observacionArchivoProyecto` varchar(255) NOT NULL,
  `fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `idUsuario` int(11) NOT NULL,
  `idCompetencia` int(11) NOT NULL,
  `idResultadoAprendizaje` int(11) NOT NULL,
  `idGrupoProyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `spf_grupos_proyecto`
--

CREATE TABLE `spf_grupos_proyecto` (
  `idGrupoProyecto` int(11) NOT NULL,
  `nombreProyecto` varchar(255) NOT NULL,
  `idFicha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `idTipoDocumento` int(11) NOT NULL,
  `nombreTipoDocumento` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tipo_documento`
--

INSERT INTO `tipo_documento` (`idTipoDocumento`, `nombreTipoDocumento`) VALUES
(1, 'Cédula de Ciudadanía'),
(2, 'Tarjeta de Identidad'),
(3, 'Cédula de Extranjería'),
(4, 'Número ciego SENA'),
(5, 'Pasaporte');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `documento` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` bigint(20) NOT NULL,
  `idTipoDocumento` int(11) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `documento`, `nombre`, `apellidos`, `email`, `telefono`, `idTipoDocumento`, `idRol`) VALUES
(1, 1034987348, 'Jerónimo', 'Marín Bohórquez', 'jmb11082004@gmail.com', 3027194137, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acceso`
--
ALTER TABLE `acceso`
  ADD PRIMARY KEY (`idAcceso`);

--
-- Indexes for table `aprendices`
--
ALTER TABLE `aprendices`
  ADD PRIMARY KEY (`idAprendiz`),
  ADD UNIQUE KEY `IDX_228cb36a82d3141dc0b0b4c33b` (`documento`),
  ADD UNIQUE KEY `IDX_c2b7df10c1a277e33f811b48d5` (`email`),
  ADD KEY `FK_acd14d6e0171f3f50800aafdd4c` (`idTipoDocumento`),
  ADD KEY `FK_1bc55212fb69a8be8419455d8b8` (`idRol`),
  ADD KEY `FK_7fc86daba74a06bdc5f26cf63e3` (`idFicha`),
  ADD KEY `FK_aff3ca6fd5c5ab99c75dc14b1ec` (`idGrupoProyecto`);

--
-- Indexes for table `comite`
--
ALTER TABLE `comite`
  ADD PRIMARY KEY (`idComite`),
  ADD KEY `FK_cbac08f1b7e1f8ba3d5e7f49ba8` (`idProgramaCoordinacion`);

--
-- Indexes for table `competencias`
--
ALTER TABLE `competencias`
  ADD PRIMARY KEY (`idCompetencia`),
  ADD KEY `FK_a386368a3c3945ea6ed823ed55c` (`idProgramaFormativo`);

--
-- Indexes for table `decision_comite`
--
ALTER TABLE `decision_comite`
  ADD PRIMARY KEY (`idDecision`);

--
-- Indexes for table `entrega_ficha`
--
ALTER TABLE `entrega_ficha`
  ADD PRIMARY KEY (`idEntregaFicha`),
  ADD KEY `FK_aa4f27bc5f38f5a3db9ee521d6b` (`idUsuario`),
  ADD KEY `FK_a6391b0ed37c6a6ad0c2385e1b0` (`idFicha`),
  ADD KEY `FK_c09d3718053faa4c2f53427d81f` (`idCompetencia`),
  ADD KEY `FK_f9305758cd73ea82b80f54dc18a` (`idResultadoAprendizaje`);

--
-- Indexes for table `estado_decision`
--
ALTER TABLE `estado_decision`
  ADD PRIMARY KEY (`idEstadoDecision`);

--
-- Indexes for table `estado_quejas`
--
ALTER TABLE `estado_quejas`
  ADD PRIMARY KEY (`idEstadoQuejas`);

--
-- Indexes for table `fichas`
--
ALTER TABLE `fichas`
  ADD PRIMARY KEY (`idFicha`),
  ADD KEY `FK_7d72ed522664f044d0181dd6501` (`idProgramaFormativo`),
  ADD KEY `FK_b1ea2b751183074fd9f7339c8b4` (`idUsuario`);

--
-- Indexes for table `ficha_usuarios`
--
ALTER TABLE `ficha_usuarios`
  ADD PRIMARY KEY (`idFichaUsuario`),
  ADD KEY `FK_dcc35b53a76a57c51593df4b652` (`idUsuario`),
  ADD KEY `FK_5956f445790dfcf25b2ab2ae3b3` (`idFicha`);

--
-- Indexes for table `motivos_comite`
--
ALTER TABLE `motivos_comite`
  ADD PRIMARY KEY (`idMotivoComite`);

--
-- Indexes for table `observaciones_aprendiz`
--
ALTER TABLE `observaciones_aprendiz`
  ADD PRIMARY KEY (`idObservacionAprendiz`),
  ADD KEY `FK_cf2c2fd851119704859ca35d370` (`idAprendiz`),
  ADD KEY `FK_c20db6b5f92c9d4cf0091c74fe2` (`idUsuario`),
  ADD KEY `FK_f2f1c97175be98478e292f72b33` (`idEstadoDecision`),
  ADD KEY `FK_b0769e8273d16f822788d0c0c40` (`idCompetencia`),
  ADD KEY `FK_6fa9e8effc53d42b3750e24a684` (`idResultadoAprendizaje`),
  ADD KEY `FK_75a69a702de3b68e1b828a4382d` (`idEntregaFicha`);

--
-- Indexes for table `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`idPermiso`);

--
-- Indexes for table `plan_mejoramiento`
--
ALTER TABLE `plan_mejoramiento`
  ADD PRIMARY KEY (`idPlanMejoramiento`),
  ADD KEY `FK_d180f7f57f834198ff5e84cad10` (`IdQueja`),
  ADD KEY `FK_5b768ce2dada11dab96e2fc7ee6` (`idUsuario`),
  ADD KEY `FK_6be813facd601eb0217ff054e4b` (`idAprendiz`),
  ADD KEY `FK_47359ae928c0f0c37e3ca8d8848` (`idEstadoDecision`),
  ADD KEY `FK_73630a2fb200e87e307b6ec8e7e` (`idMotivoComite`);

--
-- Indexes for table `programas_formativos`
--
ALTER TABLE `programas_formativos`
  ADD PRIMARY KEY (`idProgramaFormativo`);

--
-- Indexes for table `programa_coordinacion`
--
ALTER TABLE `programa_coordinacion`
  ADD PRIMARY KEY (`idPCA`),
  ADD KEY `FK_e4bfedaf692dd784723108ca072` (`idProgramaFormativo`),
  ADD KEY `FK_526fd05199324e4007bc92d7cb4` (`idUsuario`);

--
-- Indexes for table `quejas_comite`
--
ALTER TABLE `quejas_comite`
  ADD PRIMARY KEY (`idQueja`),
  ADD KEY `FK_20035e996089f892e9cf65b7b9f` (`idAprendiz`),
  ADD KEY `FK_dd325006f37ca8b424ca211f6c1` (`idUsuario`),
  ADD KEY `FK_ce6142f6ad09111d469db272693` (`idMotivoComite`),
  ADD KEY `FK_a0d91cf619ae50f7c5a294e6a29` (`idEstadoQueja`),
  ADD KEY `FK_f866a07939c693164f0ea4b993f` (`idCompetencia`),
  ADD KEY `FK_421d71926a4d2bb73f321bf6343` (`idResultadoAprendizaje`),
  ADD KEY `FK_a7533f040fe917ad7149242c3ab` (`idComite`),
  ADD KEY `FK_90a90a1055f8f5ce17d5ddd30ca` (`idDecisionComite`),
  ADD KEY `FK_f08643cd06dd752a2430a06be95` (`idObservacionAprendiz`);

--
-- Indexes for table `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  ADD PRIMARY KEY (`idResultadoAprendizaje`),
  ADD KEY `FK_9bf2b637da016d9c799b6b0dfd6` (`IdCompetencia`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indexes for table `roles_permisos`
--
ALTER TABLE `roles_permisos`
  ADD PRIMARY KEY (`idRolPermiso`),
  ADD KEY `FK_1d34a4fffb5474d1513d3018f0c` (`idRol`),
  ADD KEY `FK_ac8fc5c3587bcad4edae7ae1bd9` (`idPermiso`);

--
-- Indexes for table `spf_archivos_proyecto`
--
ALTER TABLE `spf_archivos_proyecto`
  ADD PRIMARY KEY (`idArchivosProyecto`),
  ADD KEY `FK_874d5924a3cf35c358ca2014377` (`idUsuario`),
  ADD KEY `FK_2db3d009aaf79037a6fa75ea470` (`idCompetencia`),
  ADD KEY `FK_6740bef91e41501b8be76b8f37f` (`idResultadoAprendizaje`),
  ADD KEY `FK_9549eebdf05eef6892b805f9c82` (`idGrupoProyecto`);

--
-- Indexes for table `spf_grupos_proyecto`
--
ALTER TABLE `spf_grupos_proyecto`
  ADD PRIMARY KEY (`idGrupoProyecto`),
  ADD KEY `FK_32b8f0b4361098c261e5bd7d448` (`idFicha`);

--
-- Indexes for table `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`idTipoDocumento`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `IDX_604e2077971f192d85cffb5c43` (`documento`),
  ADD UNIQUE KEY `IDX_446adfc18b35418aac32ae0b7b` (`email`),
  ADD KEY `FK_52bb2c1c0e9c6ba0f0c1e8250ff` (`idTipoDocumento`),
  ADD KEY `FK_1cd486e9216c66d450ef9b70740` (`idRol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acceso`
--
ALTER TABLE `acceso`
  MODIFY `idAcceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aprendices`
--
ALTER TABLE `aprendices`
  MODIFY `idAprendiz` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comite`
--
ALTER TABLE `comite`
  MODIFY `idComite` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `competencias`
--
ALTER TABLE `competencias`
  MODIFY `idCompetencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `decision_comite`
--
ALTER TABLE `decision_comite`
  MODIFY `idDecision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `entrega_ficha`
--
ALTER TABLE `entrega_ficha`
  MODIFY `idEntregaFicha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estado_decision`
--
ALTER TABLE `estado_decision`
  MODIFY `idEstadoDecision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `estado_quejas`
--
ALTER TABLE `estado_quejas`
  MODIFY `idEstadoQuejas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `fichas`
--
ALTER TABLE `fichas`
  MODIFY `idFicha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ficha_usuarios`
--
ALTER TABLE `ficha_usuarios`
  MODIFY `idFichaUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `motivos_comite`
--
ALTER TABLE `motivos_comite`
  MODIFY `idMotivoComite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `observaciones_aprendiz`
--
ALTER TABLE `observaciones_aprendiz`
  MODIFY `idObservacionAprendiz` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permisos`
--
ALTER TABLE `permisos`
  MODIFY `idPermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `plan_mejoramiento`
--
ALTER TABLE `plan_mejoramiento`
  MODIFY `idPlanMejoramiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `programas_formativos`
--
ALTER TABLE `programas_formativos`
  MODIFY `idProgramaFormativo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `programa_coordinacion`
--
ALTER TABLE `programa_coordinacion`
  MODIFY `idPCA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quejas_comite`
--
ALTER TABLE `quejas_comite`
  MODIFY `idQueja` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  MODIFY `idResultadoAprendizaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles_permisos`
--
ALTER TABLE `roles_permisos`
  MODIFY `idRolPermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT for table `spf_archivos_proyecto`
--
ALTER TABLE `spf_archivos_proyecto`
  MODIFY `idArchivosProyecto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `spf_grupos_proyecto`
--
ALTER TABLE `spf_grupos_proyecto`
  MODIFY `idGrupoProyecto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `idTipoDocumento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `aprendices`
--
ALTER TABLE `aprendices`
  ADD CONSTRAINT `FK_1bc55212fb69a8be8419455d8b8` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_7fc86daba74a06bdc5f26cf63e3` FOREIGN KEY (`idFicha`) REFERENCES `fichas` (`idFicha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_acd14d6e0171f3f50800aafdd4c` FOREIGN KEY (`idTipoDocumento`) REFERENCES `tipo_documento` (`idTipoDocumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_aff3ca6fd5c5ab99c75dc14b1ec` FOREIGN KEY (`idGrupoProyecto`) REFERENCES `spf_grupos_proyecto` (`idGrupoProyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comite`
--
ALTER TABLE `comite`
  ADD CONSTRAINT `FK_cbac08f1b7e1f8ba3d5e7f49ba8` FOREIGN KEY (`idProgramaCoordinacion`) REFERENCES `programa_coordinacion` (`idPCA`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `competencias`
--
ALTER TABLE `competencias`
  ADD CONSTRAINT `FK_a386368a3c3945ea6ed823ed55c` FOREIGN KEY (`idProgramaFormativo`) REFERENCES `programas_formativos` (`idProgramaFormativo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `entrega_ficha`
--
ALTER TABLE `entrega_ficha`
  ADD CONSTRAINT `FK_a6391b0ed37c6a6ad0c2385e1b0` FOREIGN KEY (`idFicha`) REFERENCES `fichas` (`idFicha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_aa4f27bc5f38f5a3db9ee521d6b` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_c09d3718053faa4c2f53427d81f` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f9305758cd73ea82b80f54dc18a` FOREIGN KEY (`idResultadoAprendizaje`) REFERENCES `resultado_aprendizaje` (`idResultadoAprendizaje`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fichas`
--
ALTER TABLE `fichas`
  ADD CONSTRAINT `FK_7d72ed522664f044d0181dd6501` FOREIGN KEY (`idProgramaFormativo`) REFERENCES `programas_formativos` (`idProgramaFormativo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_b1ea2b751183074fd9f7339c8b4` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ficha_usuarios`
--
ALTER TABLE `ficha_usuarios`
  ADD CONSTRAINT `FK_5956f445790dfcf25b2ab2ae3b3` FOREIGN KEY (`idFicha`) REFERENCES `fichas` (`idFicha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_dcc35b53a76a57c51593df4b652` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `observaciones_aprendiz`
--
ALTER TABLE `observaciones_aprendiz`
  ADD CONSTRAINT `FK_6fa9e8effc53d42b3750e24a684` FOREIGN KEY (`idResultadoAprendizaje`) REFERENCES `resultado_aprendizaje` (`idResultadoAprendizaje`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_75a69a702de3b68e1b828a4382d` FOREIGN KEY (`idEntregaFicha`) REFERENCES `entrega_ficha` (`idEntregaFicha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_b0769e8273d16f822788d0c0c40` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_c20db6b5f92c9d4cf0091c74fe2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_cf2c2fd851119704859ca35d370` FOREIGN KEY (`idAprendiz`) REFERENCES `aprendices` (`idAprendiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f2f1c97175be98478e292f72b33` FOREIGN KEY (`idEstadoDecision`) REFERENCES `estado_decision` (`idEstadoDecision`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plan_mejoramiento`
--
ALTER TABLE `plan_mejoramiento`
  ADD CONSTRAINT `FK_47359ae928c0f0c37e3ca8d8848` FOREIGN KEY (`idEstadoDecision`) REFERENCES `estado_decision` (`idEstadoDecision`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_5b768ce2dada11dab96e2fc7ee6` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_6be813facd601eb0217ff054e4b` FOREIGN KEY (`idAprendiz`) REFERENCES `aprendices` (`idAprendiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_73630a2fb200e87e307b6ec8e7e` FOREIGN KEY (`idMotivoComite`) REFERENCES `motivos_comite` (`idMotivoComite`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_d180f7f57f834198ff5e84cad10` FOREIGN KEY (`IdQueja`) REFERENCES `quejas_comite` (`idQueja`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `programa_coordinacion`
--
ALTER TABLE `programa_coordinacion`
  ADD CONSTRAINT `FK_526fd05199324e4007bc92d7cb4` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_e4bfedaf692dd784723108ca072` FOREIGN KEY (`idProgramaFormativo`) REFERENCES `programas_formativos` (`idProgramaFormativo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quejas_comite`
--
ALTER TABLE `quejas_comite`
  ADD CONSTRAINT `FK_20035e996089f892e9cf65b7b9f` FOREIGN KEY (`idAprendiz`) REFERENCES `aprendices` (`idAprendiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_421d71926a4d2bb73f321bf6343` FOREIGN KEY (`idResultadoAprendizaje`) REFERENCES `resultado_aprendizaje` (`idResultadoAprendizaje`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_90a90a1055f8f5ce17d5ddd30ca` FOREIGN KEY (`idDecisionComite`) REFERENCES `decision_comite` (`idDecision`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_a0d91cf619ae50f7c5a294e6a29` FOREIGN KEY (`idEstadoQueja`) REFERENCES `estado_quejas` (`idEstadoQuejas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_a7533f040fe917ad7149242c3ab` FOREIGN KEY (`idComite`) REFERENCES `comite` (`idComite`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ce6142f6ad09111d469db272693` FOREIGN KEY (`idMotivoComite`) REFERENCES `motivos_comite` (`idMotivoComite`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_dd325006f37ca8b424ca211f6c1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f08643cd06dd752a2430a06be95` FOREIGN KEY (`idObservacionAprendiz`) REFERENCES `observaciones_aprendiz` (`idObservacionAprendiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f866a07939c693164f0ea4b993f` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `resultado_aprendizaje`
--
ALTER TABLE `resultado_aprendizaje`
  ADD CONSTRAINT `FK_9bf2b637da016d9c799b6b0dfd6` FOREIGN KEY (`IdCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `roles_permisos`
--
ALTER TABLE `roles_permisos`
  ADD CONSTRAINT `FK_1d34a4fffb5474d1513d3018f0c` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ac8fc5c3587bcad4edae7ae1bd9` FOREIGN KEY (`idPermiso`) REFERENCES `permisos` (`idPermiso`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `spf_archivos_proyecto`
--
ALTER TABLE `spf_archivos_proyecto`
  ADD CONSTRAINT `FK_2db3d009aaf79037a6fa75ea470` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_6740bef91e41501b8be76b8f37f` FOREIGN KEY (`idResultadoAprendizaje`) REFERENCES `resultado_aprendizaje` (`idResultadoAprendizaje`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_874d5924a3cf35c358ca2014377` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_9549eebdf05eef6892b805f9c82` FOREIGN KEY (`idGrupoProyecto`) REFERENCES `spf_grupos_proyecto` (`idGrupoProyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `spf_grupos_proyecto`
--
ALTER TABLE `spf_grupos_proyecto`
  ADD CONSTRAINT `FK_32b8f0b4361098c261e5bd7d448` FOREIGN KEY (`idFicha`) REFERENCES `fichas` (`idFicha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_1cd486e9216c66d450ef9b70740` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_52bb2c1c0e9c6ba0f0c1e8250ff` FOREIGN KEY (`idTipoDocumento`) REFERENCES `tipo_documento` (`idTipoDocumento`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
