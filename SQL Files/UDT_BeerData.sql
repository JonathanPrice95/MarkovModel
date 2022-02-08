
CREATE TYPE [dbo].[BeerData] AS TABLE(
	[BeerModelNameId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Quantity] [int] NOT NULL,
	[PxA] [float] NOT NULL,
	[PxB] [float] NOT NULL,
	[PxC] [float] NOT NULL,
	[PxD] [float] NOT NULL,
	[PxE] [float] NOT NULL,
	[PxF] [float] NOT NULL,
	[PxG] [float] NOT NULL,
	[PxH] [float] NOT NULL,
	[PxI] [float] NOT NULL,
	[Growth] [int] NOT NULL,
	[CreatedBy] [int] NULL
)
GO


