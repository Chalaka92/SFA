using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Districts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DistrictController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<District>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("ListByProvinceId/{id}")]
        public async Task<ActionResult<List<District>>> ListByProvinceId()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("Details/{id}")]
        [Authorize]
        public async Task<ActionResult<District>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}