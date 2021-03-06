USE [C110_jonathan_d_price_yahoo]
GO
/****** Object:  StoredProcedure [dbo].[BeerModelNames_SelectById]    Script Date: 2/7/2022 10:08:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonathan Price
-- Create date: 3 February 2022
-- Description:	Select UserId Model Names
-- Note: 
-- =============================================

ALTER PROC [dbo].[BeerModelNames_SelectById]
		@CreatedBy int

AS

/************************** TEST CODE *******************************

Declare @CreatedBy int = 8522

Execute dbo.[BeerModelNames_SelectById]
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
WHERE (CreatedBy = @CreatedBy)
Order by Name ASC

END