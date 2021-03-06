
-- =============================================
-- Author:		Jonathan Price
-- Create date: 24 January 2022
-- Description:	Batch Insert of Beer Data
-- =============================================

ALTER PROC [dbo].[BeersMarkov_InsertBatch]
		@BatchBeers dbo.BeerData READONLY	

AS

/************************** TEST CODE *******************************

Select *
From dbo.BeersMarkov
Order by Id

Declare @NewBeerData dbo.BeerData
Declare @Id int = 0

INSERT into @NewBeerData (BeerModelNameId, Name, Quantity, PxA, PxB, PxC, PxD, PxE, PxF, PxG, PxH, PxI, Growth, CreatedBy)
Values		(2, 'Bud', 1200, 0.6, 0.3, 0.05, 0.05, 0, 0, 0, 0, 0, 75, 1),
			(2, 'Miller', 1000, 0.05, 0.65, 0.15, 0.1, 0.05, 0, 0, 0, 0, 50, 1),
			(2, 'Coors', 800, 0, 0.05, 0.7, 0.15, 0.05, 0.05, 0, 0, 0, 25, 1),
			(2, 'Sierra', 600, 0, 0, 0, 0.75, 0.2, 0.05, 0, 0, 0, -25, 1),
			(2, 'Fat Tire', 400, 0, 0, 0, 0.1, 0.8, 0.1, 0, 0, 0, -50, 1),
			(2, 'Rogue', 200, 0, 0, 0, 0.05, 0.1, 0.85, 0, 0, 0, -75, 1),
			(2, 'B7', 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1),
			(2, 'B8', 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1),
			(2, 'B9', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1)

Execute [dbo].[BeersMarkov_InsertBatch]
		@NewBeerData

Select *
From dbo.BeersMarkov
Order by Id

*/


BEGIN

Declare @IdBatchBeerResults as Table (Id int, BeerModelNameId int, [Name] nvarchar(50))

INSERT into [dbo].[BeersMarkov] (
								BeerModelNameId
								,[Name]
								,QuantityStart
								,PxA
								,PxB
								,PxC
								,PxD
								,PxE
								,PxF
								,PxG
								,PxH
								,PxI
								,Growth
								,CreatedBy
								,ModifiedBy
								)

OUTPUT	INSERTED.Id
		,INSERTED.BeerModelNameId
		,INSERTED.[Name]

INTO	@IdBatchBeerResults
		(Id
		,BeerModelNameId
		,[Name]
		)

SELECT	bb.BeerModelNameId
		,bb.[Name]
		,bb.Quantity
		,bb.PxA
		,bb.PxB
		,bb.PxC
		,bb.PxD
		,bb.PxE
		,bb.PxF
		,bb.PxG
		,bb.PxH
		,bb.PxI
		,bb.Growth
		,bb.CreatedBy
		,bb.CreatedBy
FROM @BatchBeers as bb

SELECT	Id
		,BeerModelNameId
		,[Name]
FROM @IdBatchBeerResults

END