using BuildATrain.Database.Repositories;
using BuildATrain.Models.Game;
using Lib.AspNetCore.ServerSentEvents;
using BuildATrain.Database.Models;
using BuildATrain.Models.Event;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BuildATrain.Services
{
    public class GameManagementService : EventsServiceBase
    {

        #region Properties

        private static Dictionary<string, Thread> loadedGames;
        private static Dictionary<Guid, string> clientGuidMapping;
        private static Dictionary<string, GameModel> clientGameMapping;

        private readonly IRepository<TrainModel> _trainRepository;
        private static IRepository<Attributes> _attributeRepository;
        private static IRepository<WalletModel> _walletRepository;

        private readonly IServiceScopeFactory _scopeFactory;

        #endregion

        #region Ctor

        public GameManagementService(IEventsService eventsService, IRepository<TrainModel> trainRepositor, IRepository<Attributes> attributeRepository, IServiceScopeFactory scopeFactory, IRepository<WalletModel> walletRepository) : base (eventsService)
        {
            if (loadedGames == null) loadedGames = new Dictionary<string, Thread>();
            if (clientGuidMapping == null) clientGuidMapping = new Dictionary<Guid, string>();
            if (clientGameMapping == null) clientGameMapping = new Dictionary<string, GameModel>();

            _trainRepository = trainRepositor;
            _attributeRepository = attributeRepository;
            _scopeFactory = scopeFactory;
            _walletRepository = walletRepository;
        }

        #endregion

        #region Public

        public async Task LoadGame(string userID)
        {
            if (!loadedGames.ContainsKey(userID))
            {
                var trainModels = await _trainRepository.GetPlayerTrainsByEmailAsync(userID);
                GameModel gameModel = new GameModel();

                gameModel.Email = userID;
                gameModel.Trains = trainModels.ToList();

                clientGameMapping.Add(userID, gameModel);

                loadedGames.Add(userID, new Thread(() => RunGameLoop(userID)));
                loadedGames[userID].Start();
            }
            else
            {
                //return game already exists
            }
        }

        public void EndGame(string userID)
        {
            if (loadedGames.TryGetValue(userID, out Thread? gameThread))
            {
                gameThread.Suspend();
                gameThread.Abort();
                loadedGames.Remove(userID);
            }
            else
            {
                //return game does not exist
            }
        }

        public async Task<GameModel> GetUserGameModel(string email)
        {
            var trainModels = await _trainRepository.GetPlayerTrainsByEmailAsync(email);
            GameModel gameModel = new GameModel();

            gameModel.Email = email;
            gameModel.Trains = trainModels.ToList();

            return gameModel;
        }

        public async Task UpdateModel(string userID)
        {
            var trainModels = await _trainRepository.GetPlayerTrainsByEmailAsync(userID);
            GameModel gameModel = new GameModel();

            gameModel.Email = userID;
            gameModel.Trains = trainModels.ToList();

            clientGameMapping.Remove(userID);

            clientGameMapping.Add(userID, gameModel);
        }

        public void PauseAllGames()
        {
            foreach (KeyValuePair<string, Thread> loadedGame in loadedGames)
            {
                loadedGame.Value.Suspend();
            }
        }

        public void ResumeAllGames()
        {
            foreach (KeyValuePair<string, Thread> loadedGame in loadedGames)
            {
                loadedGame.Value.Resume();
            }
        }

        #endregion

        #region Private

        private async Task RunGameLoop(string email)
        {
            string? loopDuration = "10000";

            if (loopDuration != null)
            {
                while (true)
                {

                    GameModel gameModel = clientGameMapping[email];

                    try
                    {
                        var scope = _scopeFactory.CreateScope();
                        var scopedRepoService = scope.ServiceProvider.GetService(typeof(IRepository<Attributes>));
                        var scopedWalletRepoService = scope.ServiceProvider.GetService(typeof(IRepository<WalletModel>));

                        double income = 0;
                        double newWallet = 0;

                        foreach (var train in gameModel.Trains)
                        {
                            //var locomotiveConfig = await _attributeRepository.GetByIdAsync((int)train.LocomotiveTypeId + 1);
                            var locomotiveConfig = await ((IRepository<Attributes>)scopedRepoService).GetByIdAsync(1);

                            var passengarCarConfig = await ((IRepository<Attributes>)scopedRepoService).GetByIdAsync((5));
                            var cargoCarConfig = await ((IRepository<Attributes>)scopedRepoService).GetByIdAsync((4));
                            var fuelCarConfig = await ((IRepository<Attributes>)scopedRepoService).GetByIdAsync((6));

                            double fuel = 0;
                            double fuelUse = 0;

                            double incomeMinRange = 0;
                            double incomeMaxRange = 0;

                            fuel += locomotiveConfig.FuelAdded;
                            fuelUse += locomotiveConfig.FuelUse;

                            fuel += passengarCarConfig.FuelAdded * train.NumPassengerCars;
                            fuelUse += passengarCarConfig.FuelUse * train.NumPassengerCars;

                            fuel += cargoCarConfig.FuelAdded * train.NumCargoCars;
                            fuelUse += cargoCarConfig.FuelUse * train.NumCargoCars;

                            fuel += fuelCarConfig.FuelAdded * train.NumFuelCars;
                            fuelUse += fuelCarConfig.FuelUse * train.NumFuelCars;

                            incomeMinRange += locomotiveConfig.IncomeMinRange;
                            incomeMinRange += passengarCarConfig.IncomeMinRange * train.NumPassengerCars;
                            incomeMinRange += cargoCarConfig.IncomeMinRange * train.NumCargoCars;
                            incomeMinRange += fuelCarConfig.IncomeMinRange * train.NumFuelCars;

                            incomeMaxRange += locomotiveConfig.IncomeMaxRange;
                            incomeMaxRange += passengarCarConfig.IncomeMaxRange * train.NumPassengerCars;
                            incomeMaxRange += cargoCarConfig.IncomeMaxRange * train.NumCargoCars;
                            incomeMaxRange += fuelCarConfig.IncomeMaxRange * train.NumFuelCars;

                            double distance = fuel / fuelUse;

                            income = new Random().NextDouble() * (incomeMaxRange - incomeMinRange) + incomeMinRange;
                            income *= distance;

                            var currentWallet = await (scopedWalletRepoService as Repository<WalletModel>).GetCurrentWalletByEmail(email);

                            newWallet = Convert.ToDouble(currentWallet.CurrentWallet) + income;
                            currentWallet.CurrentWallet = decimal.Round(Convert.ToDecimal(newWallet));

                            await ((IRepository<WalletModel>)scopedWalletRepoService).UpdateAsync(currentWallet);

                        }

                        //var retList = new List<KeyValuePair<string, string>>();
                        //retList.Add(new KeyValuePair<string, string>
                        //(
                        //    "wallet",
                        //    income.ToString()
                        //));

                        //await SendSSEEventAsync(clientGuidMapping.First(c => c.Value == gameModel.Email).Key, new UpdateGameEvent { Response = retList });
                        await SendSSEEventAsync(clientGuidMapping.First(c => c.Value == gameModel.Email).Key, new List<string> { newWallet.ToString(), income.ToString() });
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.ToString());
                    }

                    Thread.Sleep(Convert.ToInt32(loopDuration));
                }
            }
        }

        #endregion

        #region Override

        protected override void HandleClientConnected(object? sender, ServerSentEventsClientConnectedArgs e)
        {
            if (e.Request.Query.Any(q => q.Key == "email"))
            {
                if (!clientGuidMapping.ContainsKey(e.Client.Id)) clientGuidMapping.Add(e.Client.Id, e.Request.Query.First(q => q.Key == "email").Value);
                else
                {
                    
                    foreach (var client in clientGuidMapping)
                    {
                        if (client.Value == e.Request.Query.First(q => q.Key == "email").Value)
                            clientGuidMapping.Remove(client.Key);
                    }

                    clientGuidMapping[e.Client.Id] = e.Request.Query.First(q => q.Key == "email").Value;
                }
            }
            else
            {
                //handle error
            }
        }

        #endregion
    }
}
