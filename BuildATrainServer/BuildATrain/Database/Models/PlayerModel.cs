namespace BuildATrain.Database.Models
{
    public class PlayerModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public decimal CurrentWallet { get; set; }
    }
}
