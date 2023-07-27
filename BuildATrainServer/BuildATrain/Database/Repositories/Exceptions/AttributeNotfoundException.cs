namespace BuildATrain.Database.Repositories.Exceptions
{
    public class AttributeNotfoundException : Exception
    {
        public AttributeNotfoundException()
        {
        }

        public AttributeNotfoundException(string message)
            : base(message)
        {
        }

        public AttributeNotfoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
