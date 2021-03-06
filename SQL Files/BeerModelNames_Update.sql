
-- =============================================
-- Author:		Jonathan Price
-- Create date: 7 February 2022
-- Description:	Update Model Name
-- Note: Modified to check for duplicate names
-- =============================================

ALTER PROC [dbo].[BeerModelNames_Update]
		@Id int
		,@Name nchar(10)
		,@ModifiedBy int

AS

/************************** TEST CODE *******************************

Declare	@Id int = 1
		,@Name nchar(10) = 'Example1'
		,@ModifiedBy int = 1

Select *
From dbo.BeerModelNames
Where Id = @Id

Execute dbo.BeerModelNames_Update
		@Id
		,@Name
		,@ModifiedBy

Select *
From dbo.BeerModelNames
Where Id = @Id

*/

BEGIN

--- Check if Duplicate Name for User Id To Return Fault to Front End ---

DECLARE @TestId int = 0

INSERT INTO [dbo].[ValidModelNames]
			(ModifiedBy
			,ModelName)
		VALUES
			(@ModifiedBy
			,@Name)

SET @TestId = SCOPE_IDENTITY()

--- Set @NameIsNotDuplicate to 1 if Unique for User Id ---

Declare @NameIsNotDuplicate int = 0

Declare @DatNow datetime2(7) = getutcdate()

EXECUTE @NameIsNotDuplicate = dbo.IsModelNameUnique
			@ModifiedBy
			,@Name

--- Modify Name Only if it Does Not Already Exist ---

IF @NameIsNotDuplicate = 1

	BEGIN

			UPDATE dbo.BeerModelNames
					SET	Name = @Name
						,ModifiedBy = @ModifiedBy
						,DateModified = @DatNow
					WHERE Id = @Id

	END

--- Clean up data table ---

DELETE FROM dbo.ValidModelNames
WHERE TestId = @TestId

END