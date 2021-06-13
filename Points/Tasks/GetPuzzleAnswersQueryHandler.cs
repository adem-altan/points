using MediatR;
using Points.Entities;
using Points.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Points.Tasks
{
    public class GetPuzzleAnswersQueryHandler
    {
        public static PuzzleAnswers Handle(GetPuzzleAnswersQuery request)
        {
            var gridArea = request.GridSize * request.GridSize;
            var xArray = GeneratePoints(request.N); 
            var yArray = GeneratePoints(request.N);
            var estimatedPiValue = EstimatePi(gridArea, 0.62, request.Radius);
            
            return new PuzzleAnswers
            {
                X = xArray,
                Y = yArray,
                EstimatedPi = estimatedPiValue
            };
        }

        private static int[] GeneratePoints(int n)
        {
            int[] points = new int[n];
            Random rnd = new Random();

            for (int i =0; i < n; n++)
            {
                points[i] = rnd.Next(0, 1000);
            }

            return points;
        }

        public static double EstimatePi(int gridArea, double ratio, int radius)
        {
            return (gridArea * ratio / (radius * radius));
        }
    }
}
