using AutoMapper;
using Domain;

namespace Application.FreeIssues
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, FreeIssue>();
            CreateMap<FreeIssue, FreeIssueDto>();
        }
    }
}