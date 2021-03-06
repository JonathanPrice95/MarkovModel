
-- =============================================
-- Author:		Jonathan Price
-- Create date: 24 January 2022
-- Description:	Select All Beer Data
-- =============================================

ALTER PROC [dbo].[BeersMarkov_DeleteByModelId]
		@Id int

AS

/************************** TEST CODE *******************************

Declare @Id int = 0

Select *
From dbo.BeersMarkov
Where ModelId = @Id

Execute [dbo].[BeersMarkov_DeleteByModelId]
		@Id

Select *
From dbo.BeersMarkov
Where ModelId = @Id

*/

BEGIN

Delete
From [dbo].[BeersMarkov]
Where @Id = BeerModelNameId

END