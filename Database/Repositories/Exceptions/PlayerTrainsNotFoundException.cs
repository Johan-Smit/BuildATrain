namespace BuildATrain.Database.Repositories.NewFolder
{
    public class PlayerTrainsNotFoundException : Exception
    {
        public PlayerTrainsNotFoundException()
        {
        }

        public PlayerTrainsNotFoundException(string message)
            : base(message)
        {
        }

        public PlayerTrainsNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
