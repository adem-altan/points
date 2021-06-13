using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Points.Entities
{
    public class PuzzleAnswers
    {
        public int[] X { get; set; }
        public int[] Y { get; set; }
        public int NumberOfPointsInside { get; set; }
        public int NumberOfPointsOutside { get; set; }
        public double RatioOfPointsInside { get; set; }
        public double EstimatedPi { get; set; }
    }
}
