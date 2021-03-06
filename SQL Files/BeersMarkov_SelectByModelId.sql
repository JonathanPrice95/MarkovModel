USE [C110_jonathan_d_price_yahoo]
GO
/****** Object:  StoredProcedure [dbo].[BeersMarkov_SelectByModelId]    Script Date: 2/7/2022 9:47:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonathan Price
-- Create date: 3 February 2022
-- Description:	Select Top 6 Beer Data By Model Id
-- =============================================

ALTER PROC [dbo].[BeersMarkov_SelectByModelId]
			@BeerModelNameId int

AS

/************************** TEST CODE *******************************

Declare @BeerModelNameId int = 1

Execute [dbo].[BeersMarkov_SelectByModelId]
			@BeerModelNameId

*/


BEGIN

Select Top 6
		Id
		,BeerModelNameId as ModelId
		,[Name]
		,QuantityStart
		,PxA = ROUND(PxA, 4)
		,PxB = ROUND(PxB, 4)
		,PxC = ROUND(PxC, 4)
		,PxD = ROUND(PxD, 4)
		,PxE = ROUND(PxE, 4)
		,PxF = ROUND(PxF, 4)
		,PxG = ROUND(PxG, 4)
		,PxH = ROUND(PxH, 4)
		,PxI = ROUND(PxI, 4)
		,Growth
		,CreatedBy
		,ModifiedBy
		,DateAdded
		,DateModified
From [dbo].[BeersMarkov]
Where [NAME] != '' AND BeerModelNameId = @BeerModelNameId
Order by Id

END