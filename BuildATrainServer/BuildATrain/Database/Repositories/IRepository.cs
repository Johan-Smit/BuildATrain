﻿using BuildATrain.Models.Game;
using System.Diagnostics;

namespace BuildATrain.Database.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<TrainModel?> GetTrainByUsernameAndLocomotiveNameAsync(string username, string locomotiveName);
    }
}
