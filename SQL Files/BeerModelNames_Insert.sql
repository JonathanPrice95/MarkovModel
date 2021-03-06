
-- =============================================
-- Author:		Jonathan Price
-- Create date: 2 February 2022
-- Description:	Insert Model Name and Initialize Beer Model Data.
-- Modified on 7 February to check for duplicate Model Names by User
-- =============================================

ALTER PROC [dbo].[BeerModelNames_Insert]
		@Name nchar(10)
		,@CreatedBy int
		,@Id int OUTPUT

AS

/************************** TEST CODE *******************************

Declare @Id int = 0;

Declare	@Name nchar(10) = 'User5'
		,@CreatedBy int = 8522

Execute dbo.BeerModelNames_Insert
		@Name
		,@CreatedBy
		,@Id OUTPUT

Select @Id

Select *
From dbo.BeerModelNames
Where Id = @Id
Order by Id

Select *
From dbo.BeersMarkov
Where BeerModelNameId = @Id
Order by Id

*/

BEGIN

--- Check if Duplicate Name for User Id To Return Fault to Front End ---

DECLARE @TestId int = 0

INSERT INTO [dbo].[ValidModelNames]
			(ModifiedBy
			,ModelName)
		VALUES
			(@CreatedBy
			,@Name)

SET @TestId = SCOPE_IDENTITY()

--- Set @NameIsNotDuplicate to 1 if Unique for User Id ---

Declare @NameIsNotDuplicate int = 0

Declare @DatNow datetime2(7) = getutcdate()

EXECUTE @NameIsNotDuplicate = dbo.IsModelNameUnique
			@CreatedBy
			,@Name

--- Modify Name Only if it Does Not Already Exist ---

IF @NameIsNotDuplicate = 1

	BEGIN


			Insert	INTO dbo.BeerModelNames
						(Name
						,CreatedBy
						,ModifiedBy
						)

					VALUES
						(@Name
						,@CreatedBy
						,@CreatedBy
						)

					SET @Id = SCOPE_IDENTITY()

			Declare @NewBeerData dbo.BeerData

			INSERT into @NewBeerData (BeerModelNameId, Name, Quantity, PxA, PxB, PxC, PxD, PxE, PxF, PxG, PxH, PxI, Growth, CreatedBy)
			Values		(@Id, 'B1', 100, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
						(@Id, 'B2', 200, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1),
						(@Id, 'B3', 300, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1),
						(@Id, 'B4', 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1),
						(@Id, 'B5', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
						(@Id, 'B6', 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
						(@Id, 'B7', 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1),
						(@Id, 'B8', 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1),
						(@Id, 'B9', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1)

			Execute [dbo].[BeersMarkov_InsertBatch]
					@NewBeerData

	END

--- Clean up data table ---

DELETE FROM dbo.ValidModelNames
WHERE TestId = @TestId

END