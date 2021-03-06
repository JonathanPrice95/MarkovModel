
-- =============================================
-- Author:		Jonathan Price
-- Create date: 3 February 2022
-- Description:	Select Sample and UserId Model Names
-- Note: UserId of 1 is reserved for the sample model
-- =============================================

ALTER PROC [dbo].[BeerModelNames_SelectAll]
		@CreatedBy int

AS

/************************** TEST CODE *******************************

Declare @CreatedBy int = 8522

Execute dbo.BeerModelNames_SelectAll
		@CreatedBy

*/

BEGIN

Select	Id
		,Name
		,CreatedBy
		,ModifiedBy
		,DateCreated
		,DateModified
From dbo.BeerModelNames
WHERE (CreatedBy = @CreatedBy OR CreatedBy = 1)
Order by Name ASC

END