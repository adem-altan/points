using Microsoft.AspNetCore.Mvc;
using Points.Entities;
using System;

namespace Points.Controllers
{
    [ApiController]
    [Route("points")]
    public class PointsController : Controller
    {
        [HttpGet]
        public PuzzleAnswers SolvePuzzle(int n, int iterations,
                                         int gridSize, int radius)
        {
            var xArray = GeneratePoints(n, gridSize);
            var yArray = GeneratePoints(n, gridSize);
            var numberOfPointsInside = FindNumberOfPointsInside(xArray, yArray, gridSize, radius);
            
            var gridArea = gridSize * gridSize;
            var ratioOfPointsInside = (double)numberOfPointsInside / n;
            var estimatedPi = EstimatePi(gridArea, ratioOfPointsInside, radius);

            return new PuzzleAnswers
            {
                X = xArray,
                Y = yArray,
                NumberOfPointsInside = numberOfPointsInside,
                NumberOfPointsOutside = n - numberOfPointsInside,
                RatioOfPointsInside = ratioOfPointsInside,
                EstimatedPi = estimatedPi
            };
        }

        private static int[] GeneratePoints(int n, int gridSize)
        {
            int[] points = new int[n];
            Random r = new Random();

            for (int i = 0; i < n; i++)
            {
                points[i] = r.Next(0, gridSize);
            }

            return points;
        }

        public static int FindNumberOfPointsInside(int[] x, int[] y, int gridSize, int radius)
        {
            var centre = gridSize / 2;
            var index = 0;
            var numberOfPointsInside = 0;

            while (index < x.Length)
            {
                var distance = Math.Sqrt(Math.Pow(centre - x[index], 2) + Math.Pow(centre - y[index], 2));
                
                if (distance < radius)
                {
                    numberOfPointsInside++;
                }

                index++;
            }
        
            return numberOfPointsInside;
        }

        public static double EstimatePi(int gridArea, double ratio, int radius)
        {
            return (gridArea * ratio) / (Math.Pow(radius, 2));
        }
    }
}
