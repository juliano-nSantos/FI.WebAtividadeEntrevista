﻿CREATE PROC FI_SP_VerificaBeneficiarioRetId
	@CPF VARCHAR(14)
AS
BEGIN
	SELECT IDCLIENTE FROM BENEFICIARIOS WHERE CPF = @CPF
END