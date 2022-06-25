USE [CamLotto3]
GO

/****** Object: SqlProcedure [dbo].[Sp_BettingDetail] Script Date: 6/23/2022 7:49:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Sp_BettingDetail] 
	-- Add the parameters for the stored procedure here
	@BettingID int
AS
BEGIN

If(OBJECT_ID('tempdb..#temp_list') Is Not Null)
Begin
    Drop Table #temp_list
End


declare @UnitWin int
set @UnitWin=90


BEGIN TRAN

declare @RemainBalance float
declare @CurrentDate date = dbo.getCurrentDateTime()

set @RemainBalance = isnull(( select sum(RemainingBalance) as Balance from tblBalance where BalanceDate = @CurrentDate),0)

set @RemainBalance=0


	Create table #temp_list(GameID int, PlaceID int,BettingID int,SlotNumber int,BetType varchar(50),BetNumber varchar(50),BetAmount float,UnitWinAmount float,WinAmount float,TotalBet float)

	DECLARE @GameID int,@PlaceID int,@SlotNumber int,@BetType varchar(50),@BetNumber varchar(450),@BetAmount float,@UnitWinAmount float,@WinAmount float,@TotalBet float


	-------Series X------------
		DECLARE @BettingList CURSOR
		SET @BettingList = CURSOR FOR

			select GameID,PlaceID,1 as SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet
			from tblBetting where BettingID=@BettingID  and SlotNumber like '%1%'
			union
			select GameID,PlaceID,2 as SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet
			from tblBetting where BettingID=@BettingID  and SlotNumber like '%2%'
			union
			select GameID,PlaceID,3 as SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet
			from tblBetting where BettingID=@BettingID  and SlotNumber like '%3%'
			union
			select GameID,PlaceID,4 as SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet
			from tblBetting where BettingID=@BettingID  and SlotNumber like '%4%'
			union
			select GameID,PlaceID,5 as SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet
			from tblBetting where BettingID=@BettingID  and SlotNumber like '%5%'


		OPEN @BettingList
		FETCH NEXT
		FROM @BettingList INTO  @GameID,@PlaceID ,@SlotNumber ,@BetType,@BetNumber,@BetAmount,@UnitWinAmount,@WinAmount,@TotalBet
		WHILE @@FETCH_STATUS = 0
		BEGIN

				if @BetType='N'
					BEGIN
						DECLARE @name NVARCHAR(255)
						 DECLARE @pos INT
						 --set @BetNumber = @BetNumber + ','
						 WHILE CHARINDEX(',', @BetNumber) > 0
						 BEGIN
						  SELECT @pos  = CHARINDEX(',', @BetNumber)  
						  SELECT @name = SUBSTRING(@BetNumber, 1, @pos-1)

						  INSERT INTO #temp_list(PlaceID,GameID,BettingID,SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet)
						  SELECT @PlaceID,@GameID,@BettingID,@SlotNumber,@BetType,@name,@BetAmount,@UnitWin,@BetAmount*@UnitWin,@TotalBet

						  SELECT @BetNumber = SUBSTRING(@BetNumber, @pos+1, LEN(@BetNumber)-@pos)
						 END

						  INSERT INTO #temp_list(GameID,PlaceID,BettingID,SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet)
						  SELECT @GameID,@PlaceID,@BettingID,@SlotNumber,@BetType,@BetNumber,@BetAmount,@UnitWin,@BetAmount*@UnitWin,@TotalBet
					end
				else
					begin
					
						if @BetType='R'
							begin
									DECLARE @string_start_number NVARCHAR(255)
									declare @string_end_number varchar(50)
									DECLARE @pos_number INT

									 WHILE CHARINDEX('-', @BetNumber) > 0
									 BEGIN
									  SELECT @pos_number  = CHARINDEX('-', @BetNumber)  
									  SELECT @string_start_number = SUBSTRING(@BetNumber, 1, @pos_number-1)
			

									  SELECT @BetNumber = SUBSTRING(@BetNumber, @pos_number+1, LEN(@BetNumber)-@pos_number)
									 END				
									set @string_end_number= @BetNumber

									declare @running int=0
									set @running = @string_start_number

									while @string_end_number>=@running
										begin
						
												INSERT INTO #temp_list(PlaceID,GameID,BettingID,SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet)
												SELECT @PlaceID,@GameID,@BettingID,@SlotNumber,@BetType,@running,@BetAmount,@UnitWin,@BetAmount*@UnitWin,@TotalBet

												set @running +=1
										end

							end
						else
							begin
							INSERT INTO #temp_list(PlaceID,GameID,BettingID,SlotNumber,BetType,BetNumber,BetAmount,UnitWinAmount,WinAmount,TotalBet)
							values(@PlaceID, @GameID, @BettingID,@SlotNumber,@BetType,@BetNumber,@BetAmount, @UnitWin,@UnitWin*@BetAmount,@TotalBet)

						end
					end
		FETCH NEXT
		FROM @BettingList INTO @GameID,@PlaceID ,@SlotNumber ,@BetType,@BetNumber,@BetAmount,@UnitWinAmount,@WinAmount,@TotalBet
		END
		CLOSE @BettingList
		DEALLOCATE @BettingList

	


		----------------------------
		
		INSERT INTO tblBettingDetail(BettingID, GameID, PlaceID, SlotNumber, BetType, BetNumber, BetAmount, UnitWinAmount, WinAmount, TotalBet, CreatedDate, CreatedBy)
		select BettingID,GameID,PlaceID,SlotNumber, BetType, BetNumber,BetAmount, @UnitWin,@UnitWin*BetAmount as WinAmount,TotalBet,@CurrentDate,'chanpheakdey.vong' 
		from #temp_list

IF (@@ERROR <> 0) BEGIN
        PRINT 'Unexpected error occurred!'

		ROLLBACK TRAN        
	END
   
COMMIT TRAN	

If(OBJECT_ID('tempdb..#temp_list') Is Not Null)
Begin
    Drop Table #temp_list
End
	

END
