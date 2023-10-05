INSERT INTO `roles` (`idRol`, `nombreRol`) VALUES
(1, 'Administrador'),
(2, 'Coordinador'),
(3, 'Asistente Coordinador'),
(4, 'Admin Instructor'),
(5, 'Instructor'),
(6, 'Aprendiz');

INSERT INTO `tipo_documento` (`idTipoDocumento`, `nombreTipoDocumento`) VALUES
(1, 'Cédula de Ciudadanía'),
(2, 'Tarjeta de Identidad'),
(3, 'Cédula de Extranjería'),
(4, 'Número ciego SENA'),
(5, 'Pasaporte');

INSERT INTO `estado_decision` (`idEstadoDecision`, `nombreEstadoDecision`) VALUES
(1, 'Aprobado'),
(2, 'No Aprobado');

INSERT INTO `estado_quejas` (`idEstadoQuejas`, `nombreEstadoQuejas`) VALUES
(1, 'Sin completar'),
(2, 'Listado'),
(3, 'Citado'),
(4, 'En proceso'),
(5, 'Finalizado');

INSERT INTO `decision_comite` (`idDecision`, `nombreDecision`) VALUES
(1, 'Ninguna'),
(2, 'Plan de Mejoramiento'),
(3, 'Cancelación'),
(4, 'Plan de Mejoramiento con Condicionamiento'),
(5, 'Otro');

INSERT INTO `motivos_comite` (`idMotivoComite`, `nombreMotivo`) VALUES
(1, 'No Aplica'),
(2, 'Bajo Rendimiento'),
(3, 'Deserción'),
(4, 'Falta Disciplinaria'),
(5, 'Felicitaciones');

INSERT INTO `acceso` (`idAcceso`, `documento`, `password`, `idUsuarioAprendiz`, `tablaAcceso`, `forgotPassword`) VALUES
(1, 1034987348, '$2a$10$GGOeWHYzd/mlbFEs0EZjyuj3uUEwLw1cku.aDWy8S4saDM.yWOaHm', 1, 1, NULL);


INSERT INTO `usuarios` (`idUsuario`, `documento`, `nombre`, `apellidos`, `email`, `telefono`, `idTipoDocumento`, `idRol`) VALUES
(1, 1034987348, 'Jerónimo', 'Marín Bohórquez', 'jmb@example.com', 3027194137, 1, 1);

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

-- Default Config --
-- Administrador
INSERT INTO `roles_permisos`(`idRolPermiso`, `access`, `idRol`, `idPermiso`) VALUES
(NULL, 1, 1, 1),(NULL, 1, 1, 2),(NULL, 1, 1, 3),(NULL, 1, 1, 4),(NULL, 1, 1, 5),(NULL, 1, 1, 6),(NULL, 0, 1, 7),
(NULL, 0, 1, 8),(NULL, 0, 1, 9),(NULL, 0, 1, 10),(NULL, 0, 1, 11),(NULL, 0, 1, 12),(NULL, 0, 1, 13),(NULL, 0, 1, 14),
(NULL, 0, 1, 15),(NULL, 0, 1, 16),(NULL, 0, 1, 17),(NULL, 0, 1, 18),(NULL, 0, 1, 19),(NULL, 0, 1, 20),(NULL, 0, 1, 21),
(NULL, 0, 1, 22),(NULL, 0, 1, 23),(NULL, 0, 1, 24),(NULL, 0, 1, 25),(NULL, 0, 1, 26),(NULL, 0, 1, 27),(NULL, 0, 1, 28),(NULL, 0, 1, 29),
(NULL, 0, 1, 30),(NULL, 0, 1, 31),(NULL, 0, 1, 32),(NULL, 0, 1, 33);

-- Coordinador
INSERT INTO `roles_permisos`(`idRolPermiso`, `access`, `idRol`, `idPermiso`) VALUES
(NULL, 1, 2, 1),(NULL, 1, 2, 2),(NULL, 1, 2, 3),(NULL, 1, 2, 4),(NULL, 1, 2, 5),(NULL, 1, 2, 6),(NULL, 1, 2, 7),
(NULL, 1, 2, 8),(NULL, 1, 2, 9),(NULL, 1, 2, 10),(NULL, 1, 2, 11),(NULL, 0, 2, 12),(NULL, 0, 2, 13),(NULL, 0, 2, 14),
(NULL, 0, 2, 15),(NULL, 0, 2, 16),(NULL, 0, 2, 17),(NULL, 0, 2, 18),(NULL, 1, 2, 19),(NULL, 0, 2, 20),(NULL, 0, 2, 21),
(NULL, 1, 2, 22),(NULL, 0, 2, 23),(NULL, 1, 2, 24),(NULL, 1, 2, 25),(NULL, 1, 2, 26),(NULL, 1, 2, 27),(NULL, 1, 2, 28),
(NULL, 1, 2, 29),(NULL, 1, 2, 30),(NULL, 0, 2, 31),(NULL, 0, 2, 32),(NULL, 0, 2, 33);

-- Asistente Coordinador
INSERT INTO `roles_permisos`(`idRolPermiso`, `access`, `idRol`, `idPermiso`) VALUES
(NULL, 1, 3, 1),(NULL, 1, 3, 2),(NULL, 1, 3, 3),(NULL, 1, 3, 4),(NULL, 1, 3, 5),(NULL, 1, 3, 6),(NULL, 1, 3, 7),
(NULL, 1, 3, 8),(NULL, 1, 3, 9),(NULL, 1, 3, 10),(NULL, 1, 3, 11),(NULL, 0, 3, 12),(NULL, 0, 3, 13),(NULL, 0, 3, 14),
(NULL, 0, 3, 15),(NULL, 0, 3, 16),(NULL, 0, 3, 17),(NULL, 0, 3, 18),(NULL, 1, 3, 19),(NULL, 0, 3, 20),(NULL, 0, 3, 21),
(NULL, 1, 3, 22),(NULL, 0, 3, 23),(NULL, 1, 3, 24),(NULL, 1, 3, 25),(NULL, 1, 3, 26),(NULL, 1, 3, 27),(NULL, 1, 3, 28),
(NULL, 1, 3, 29),(NULL, 1, 3, 30),(NULL, 0, 3, 31),(NULL, 0, 3, 32),(NULL, 0, 3, 33);

-- Admin Instructor
INSERT INTO `roles_permisos`(`idRolPermiso`, `access`, `idRol`, `idPermiso`) VALUES
(NULL, 0, 4, 1),(NULL, 0, 4, 2),(NULL, 0, 4, 3),(NULL, 0, 4, 4),(NULL, 0, 4, 5),(NULL, 1, 4, 6),(NULL, 1, 4, 7),
(NULL, 1, 4, 8),(NULL, 1, 4, 9),(NULL, 1, 4, 10),(NULL, 1, 4, 11),(NULL, 1, 4, 12),(NULL, 1, 4, 13),(NULL, 1, 4, 14),
(NULL, 1, 4, 15),(NULL, 0, 4, 16),(NULL, 0, 4, 17),(NULL, 0, 4, 18),(NULL, 1, 4, 19),(NULL, 1, 4, 20),(NULL, 1, 4, 21),
(NULL, 0, 4, 22),(NULL, 1, 4, 23),(NULL, 0, 4, 24),(NULL, 0, 4, 25),(NULL, 0, 4, 26),(NULL, 0, 4, 27),(NULL, 0, 4, 28),
(NULL, 0, 4, 29),(NULL, 0, 4, 30),(NULL, 1, 4, 31),(NULL, 1, 4, 32),(NULL, 1, 4, 33);

-- Instructor
INSERT INTO `roles_permisos`(`idRolPermiso`, `access`, `idRol`, `idPermiso`) VALUES
(NULL, 0, 5, 1),(NULL, 0, 5, 2),(NULL, 0, 5, 3),(NULL, 0, 5, 4),(NULL, 0, 5, 5),(NULL, 0, 5, 6),(NULL, 1, 5, 7),
(NULL, 0, 5, 8),(NULL, 0, 5, 9),(NULL, 1, 5, 10),(NULL, 0, 5, 11),(NULL, 1, 5, 12),(NULL, 1, 5, 13),(NULL, 1, 5, 14),
(NULL, 1, 5, 15),(NULL, 0, 5, 16),(NULL, 0, 5, 17),(NULL, 0, 5, 18),(NULL, 1, 5, 19),(NULL, 1, 5, 20),(NULL, 1, 5, 21),
(NULL, 0, 5, 22),(NULL, 1, 5, 23),(NULL, 0, 5, 24),(NULL, 0, 5, 25),(NULL, 0, 5, 26),(NULL, 0, 5, 27),(NULL, 0, 5, 28),
(NULL, 0, 5, 29),(NULL, 0, 5, 30),(NULL, 1, 5, 31),(NULL, 1, 5, 32),(NULL, 1, 5, 33);

-- Aprendices
INSERT INTO `roles_permisos`(`idRolPermiso`, `access`, `idRol`, `idPermiso`) VALUES
(NULL, 0, 6, 1),(NULL, 0, 6, 2),(NULL, 0, 6, 3),(NULL, 0, 6, 4),(NULL, 0, 6, 5),(NULL, 0, 6, 6),(NULL, 0, 6, 7),
(NULL, 0, 6, 8),(NULL, 0, 6, 9),(NULL, 0, 6, 10),(NULL, 0, 6, 11),(NULL, 0, 6, 12),(NULL, 0, 6, 13),(NULL, 0, 6, 14),
(NULL, 0, 6, 15),(NULL, 0, 6, 16),(NULL, 0, 6, 17),(NULL, 0, 6, 18),(NULL, 0, 6, 19),(NULL, 0, 6, 20),(NULL, 0, 6, 21),
(NULL, 0, 6, 22),(NULL, 0, 6, 23),(NULL, 0, 6, 24),(NULL, 0, 6, 25),(NULL, 0, 6, 26),(NULL, 0, 6, 27),(NULL, 0, 6, 28),
(NULL, 0, 6, 29),(NULL, 0, 6, 30),(NULL, 0, 6, 31),(NULL, 0, 6, 32),(NULL, 0, 6, 33);