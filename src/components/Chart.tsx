import { useRef, useEffect, useState, useCallback } from "react";

const Chart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Simple data points (values out of 100) for 6 months
  const rawDataPoints = [50, 30, 70, 40, 90, 60]; // Example values
  const labels = ["**", "Feb", "Mar", "Apr", "May", "**"];

  const lineColor = "#4A6B4A"; // Dark olive green, matching the image
  const fillColor = "#E0E6E0"; // Light grey-green, matching the image
  const labelColor = "#4A6B4A"; // Same as line color for consistency
  const curveTension = 0.25; // Controls the smoothness of the Bezier curves

  // Helper function to get control points for a smooth curve segment
  // This function helps create the smooth Bezier curves for the line and fill.
  const getControlPoints = useCallback(
    (points: { x: number; y: number }[], i: number) => {
      const p0 = points[i - 1] || points[i]; // Previous point, or current if first
      const p1 = points[i]; // Current point
      const p2 = points[i + 1] || points[i]; // Next point, or current if last
      const p3 = points[i + 2] || points[i + 1] || points[i]; // Point after next, or next if second to last, or current if last

      // Calculate control points based on tension
      const cp1x = p1.x + (p2.x - p0.x) * curveTension;
      const cp1y = p1.y + (p2.y - p0.y) * curveTension;

      const cp2x = p2.x - (p3.x - p1.x) * curveTension;
      const cp2y = p2.y - (p3.y - p1.y) * curveTension;

      return { cp1x, cp1y, cp2x, cp2y };
    },
    [curveTension],
  );

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match container's client dimensions
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Define padding for the chart area within the canvas
    const padding = { top: 60, right: 0, bottom: 40, left: 0 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;
    const baselineY = padding.top + chartHeight; // The bottom of the chart area (representing 0)

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

    // Scale raw data points to canvas coordinates
    const scaledPoints = rawDataPoints.map((value, index) => {
      // X-coordinate: distribute points evenly across the chart width
      const x =
        padding.left + (index / (rawDataPoints.length - 1)) * chartWidth;
      // Y-coordinate: scale value from 0-100 to chartHeight, inverted (higher value = lower Y)
      const y = baselineY - (value / 100) * chartHeight;
      return { x, y };
    });

    // Draw the baseline (X-axis)
    ctx.beginPath();
    ctx.moveTo(padding.left, baselineY);
    ctx.lineTo(padding.left + chartWidth, baselineY);
    ctx.strokeStyle = labelColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw the filled area
    ctx.beginPath();
    ctx.moveTo(scaledPoints[0].x, baselineY); // Start at the baseline below the first point
    ctx.lineTo(scaledPoints[0].x, scaledPoints[0].y); // Draw straight up to the first point on the curve

    // Draw the smooth curve for the fill
    for (let i = 0; i < scaledPoints.length - 1; i++) {
      const { cp1x, cp1y, cp2x, cp2y } = getControlPoints(scaledPoints, i);
      ctx.bezierCurveTo(
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        scaledPoints[i + 1].x,
        scaledPoints[i + 1].y,
      );
    }

    ctx.lineTo(scaledPoints[scaledPoints.length - 1].x, baselineY); // Go down to baseline at last point
    ctx.closePath(); // Close the path to form a shape
    ctx.fillStyle = fillColor;
    ctx.fill();

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y); // Start at the first data point

    // Draw the smooth curve for the line
    for (let i = 0; i < scaledPoints.length - 1; i++) {
      const { cp1x, cp1y, cp2x, cp2y } = getControlPoints(scaledPoints, i);
      ctx.bezierCurveTo(
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        scaledPoints[i + 1].x,
        scaledPoints[i + 1].y,
      );
    }

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round"; // Ensures corners are rounded if any
    ctx.stroke();

    // Draw x-axis labels
    ctx.font = "16px Arial"; // Font style for labels
    ctx.fillStyle = labelColor;
    ctx.textAlign = "center"; // Center align text for labels

    labels.forEach((label, index) => {
      // Position labels directly below their corresponding data points
      const x = scaledPoints[index].x;
      // Position labels below the chart, adjusted for padding
      ctx.fillText(label, x, canvas.height - padding.bottom / 2 + 10);
    });
  }, [
    rawDataPoints,
    labels,
    lineColor,
    fillColor,
    labelColor,
    getControlPoints,
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Update dimensions state to trigger redraw
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Set initial dimensions when component mounts
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  useEffect(() => {
    // Redraw chart whenever dimensions change
    drawChart();
  }, [drawChart, dimensions]); // `drawChart` is memoized by useCallback, `dimensions` is state

  return (
    <div className="flex items-center w-full  h-0">
      <div
        ref={containerRef}
        className="relative w-full aspect-[3/2]" // Container for the canvas, maintains aspect ratio
        role="img"
        aria-label="Area chart showing data fluctuation over months from January to June. The line is dark green and the area fill is light grey-green."
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Chart;
