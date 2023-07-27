namespace BuildATrain.Database.Repositories.Exceptions
{
    public class CurrentWalletNotFoundException : Exception
    {
        public CurrentWalletNotFoundException()
        {
        }

        public CurrentWalletNotFoundException(string message)
            : base(message)
        {
        }

        public CurrentWalletNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
