USE [C110_jonathan_d_price_yahoo]
GO
/****** Object:  StoredProcedure [dbo].[BeersMarkov_SelectExample]    Script Date: 2/7/2022 9:46:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonathan Price
-- Create date: 24 January 2022
-- Description:	Select All Beer Data
-- =============================================

ALTER PROC [dbo].[BeersMarkov_SelectExample]

AS

/************************** TEST CODE *******************************

Execute [dbo].[BeersMarkov_SelectExample]

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
Where [NAME] != ''
Order by Id

END