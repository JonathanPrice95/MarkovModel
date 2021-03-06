
-- =============================================
-- Author:		Jonathan Price
-- Create date: 24 January 2022
-- Description:	Select All Beer Data
-- =============================================

ALTER PROC [dbo].[BeersMarkov_DeleteById]
		@Id int

AS

/************************** TEST CODE *******************************

Declare @Id int = 0

Select *
From dbo.BeersMarkov
Where Id = @Id

Execute [dbo].[BeersMarkov_DeleteById]
		@Id

Select *
From dbo.BeersMarkov
Where Id = @Id

*/

BEGIN

Delete
From [dbo].[BeersMarkov]
Where @Id = Id

END