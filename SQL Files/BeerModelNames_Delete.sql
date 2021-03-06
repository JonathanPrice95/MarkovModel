USE [C110_jonathan_d_price_yahoo]
GO
/****** Object:  StoredProcedure [dbo].[BeerModelNames_Delete]    Script Date: 2/7/2022 10:09:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonathan Price
-- Create date: 2 February 2022
-- Description:	Delete Model Name
-- =============================================

ALTER PROC [dbo].[BeerModelNames_Delete]
		@Id int

AS

/************************** TEST CODE *******************************

Declare	@Id int = 88888

Select *
From dbo.BeerModelNames
Where Id = @Id

Execute dbo.BeerModelNames_Delete
		@Id

Select *
From dbo.BeerModelNames
Where Id = @Id

*/

BEGIN

Execute [dbo].[BeersMarkov_DeleteByModelId]
		@Id

Delete 
From dbo.BeerModelNames
WHERE Id = @Id

END