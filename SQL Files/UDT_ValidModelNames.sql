CREATE TABLE [dbo].[ValidModelNames](
	[TestId] [int] IDENTITY(1,1) NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModelName] [nchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ValidModelNames]  WITH CHECK ADD  CONSTRAINT [checkDuplicateNamesByUser] CHECK  (([dbo].[IsModelNameUnique]([ModifiedBy],[ModelName])=(1)))
GO

ALTER TABLE [dbo].[ValidModelNames] CHECK CONSTRAINT [checkDuplicateNamesByUser]
GO


