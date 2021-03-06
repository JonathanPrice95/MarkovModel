
-- =============================================
-- Author:		Jonathan Price
-- Create date: 7 February 2022
-- Description:	UDF to check for duplicate Model Name by same user
-- Note: 
-- =============================================


ALTER	FUNCTION [dbo].[IsModelNameUnique]
			(@ModifiedBy int
			,@Name nchar(10))
		RETURNS INT
		
AS

BEGIN

IF @Name IN		(Select	bmn.Name
				FROM dbo.BeerModelNames as bmn
				WHERE bmn.CreatedBy = @ModifiedBy)

	BEGIN

		RETURN 0;

	END

RETURN 1;

END