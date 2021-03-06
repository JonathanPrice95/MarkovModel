
-- =============================================
-- Author:		Jonathan Price
-- Create date: 24 January 2022
-- Description:	Batch Update of Beer Data
-- =============================================

ALTER PROC [dbo].[BeersMarkov_UpdateBatch]
		@BatchBeers dbo.BeerDataUpdate READONLY	

AS

/************************** TEST CODE *******************************

Select *
From dbo.BeersMarkov
Order by Id

Declare @NewBeerData dbo.BeerDataUpdate

INSERT into @NewBeerData (Id, Name, Quantity, PxA, PxB, PxC, PxD, PxE, PxF, PxG, PxH, PxI, Growth, ModifiedBy)
Values		(1, 'Bud', 1000, 0.65, 0.3, 0.05, 0, 0, 0, 0, 0, 0, 0, 1),
			(2, 'Miller', 500, .1, .75, .15, 0, 0, 0, 0, 0, 0, 0, 1),
			(3, 'Coors', 250, 0, 0.1, 0.9, 0, 0, 0, 0, 0, 0, 0, 1)

Execute [dbo].[BeersMarkov_UpdateBatch]
		@NewBeerData

Select *
From dbo.BeersMarkov
Order by Id

*/


BEGIN

Declare @DatMod datetime2(7) = getutcdate()

Update [dbo].[BeersMarkov] 
		Set		[Name] = bb.[Name]
				,QuantityStart = bb.Quantity
				,PxA = ROUND (bb.PxA, 4)
				,PxB = ROUND (bb.PxB, 4)
				,PxC = ROUND (bb.PxC, 4)
				,PxD = ROUND (bb.PxD, 4)
				,PxE = ROUND (bb.PxE, 4)
				,PxF = ROUND (bb.PxF, 4)
				,PxG = ROUND (bb.PxG, 4)
				,PxH = ROUND (bb.PxH, 4)
				,PxI = ROUND (bb.PxI, 4)
				,Growth = bb.Growth
				,ModifiedBy = bb.ModifiedBy
				,DateModified = @DatMod
FROM @BatchBeers as bb inner join dbo.BeersMarkov as bm
				on bb.Id = bm.Id

END