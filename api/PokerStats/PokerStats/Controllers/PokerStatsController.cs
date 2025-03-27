using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using PokerStats.Models;

namespace PokerStats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokerStatsController : ControllerBase
    {
        private IConfiguration _configuration;

        public PokerStatsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetStats")]

        public JsonResult GetStats()
        {
            string query = "select * from dbo.pokerstats";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("pokerStatsDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        [Route("AddStat")]
        public JsonResult AddStat([FromBody] PokerStatsModel stat)
        {
            string query = @"
                INSERT INTO dbo.pokerstats (game, moneyIn, moneyOut, duration, datePlayed) 
                VALUES (@game, @moneyIn, @moneyOut, @duration, @datePlayed)";

            string sqlDataSource = _configuration.GetConnectionString("pokerStatsDBCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@game", stat.Game);
                    myCommand.Parameters.AddWithValue("@moneyIn", stat.MoneyIn);
                    myCommand.Parameters.AddWithValue("@moneyOut", stat.MoneyOut);
                    myCommand.Parameters.AddWithValue("@duration", stat.Duration);
                    myCommand.Parameters.AddWithValue("@datePlayed", stat.DatePlayed);

                    myCommand.ExecuteNonQuery();
                }
            }

            return new JsonResult(new { message = "Poker stat added successfully!" });
        }

        [HttpDelete]
        [Route("DeleteStat/{id}")]
        public JsonResult DeleteStat(long id)
        {
            string query = "DELETE FROM dbo.pokerstats WHERE id = @id";
            string sqlDataSource = _configuration.GetConnectionString("pokerStatsDBCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    int rowsAffected = myCommand.ExecuteNonQuery();

                    if (rowsAffected == 0)
                    {
                        return new JsonResult(new { message = "Poker stat not found!" }) { StatusCode = 404 };
                    }
                }
            }

            return new JsonResult(new { message = "Poker stat deleted successfully!" });
        }

        [HttpPut]
        [Route("UpdateStat/{id}")]
        public JsonResult UpdateStat(long id, [FromBody] PokerStatsModel updatedStat)
        {
            string query = @"
                UPDATE dbo.pokerstats 
                SET game = @game, moneyIn = @moneyIn, moneyOut = @moneyOut, 
                    duration = @duration, datePlayed = @datePlayed
                WHERE id = @id";

            string sqlDataSource = _configuration.GetConnectionString("pokerStatsDBCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@game", updatedStat.Game);
                    myCommand.Parameters.AddWithValue("@moneyIn", updatedStat.MoneyIn);
                    myCommand.Parameters.AddWithValue("@moneyOut", updatedStat.MoneyOut);
                    myCommand.Parameters.AddWithValue("@duration", updatedStat.Duration);
                    myCommand.Parameters.AddWithValue("@datePlayed", updatedStat.DatePlayed);

                    int rowsAffected = myCommand.ExecuteNonQuery();

                    if (rowsAffected == 0)
                    {
                        return new JsonResult(new { message = "Poker stat not found!" }) { StatusCode = 404 };
                    }
                }
            }

            return new JsonResult(new { message = "Poker stat updated successfully!" });
        }
    }
}
