namespace Domain
{
    public class Status
    {
        public int Id { get; set; }
        public int StatusTypeId { get; set; }
        public string Name { get; set; }
        public virtual StatusType StatusType { get; set; }
        public virtual Shop Shop { get; set; }
        public virtual ItemBatch ItemBatch { get; set; }
    }
}