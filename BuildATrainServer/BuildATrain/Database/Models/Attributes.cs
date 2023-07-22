﻿namespace BuildATrain.Database.Models
{
    public class Attributes
    {
        public int Id { get; set; }
        public string AttributeName { get; set; }
        public int CarCapacity { get; set; }
        public int FuelUse { get; set; }
        public int FuelAdded { get; set; }
        public decimal PurchasePrice { get; set; }
    }
}