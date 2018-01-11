import React, { Component } from 'react';
import { Icon, Dropdown, Image } from 'semantic-ui-react';
import { fabric } from 'fabric/dist/fabric';
import circle from '../static/images/control/circle.png';
import line from '../static/images/control/line.png';
import triangle from '../static/images/control/triangle.png';
import rect from '../static/images/control/rect.png';
import pentagon from '../static/images/control/pentagon.png';
import pentagram from '../static/images/control/pentagram.png';
import hexagon from '../static/images/control/hexagon.png';

class Shape extends Component {
  constructor(props) {
    super(props);
    
  }

  addLine = () => {
    const line = new fabric.Line([105, 250, 205, 250], {
      left: 200,
      top: 200,
      fill: this.props.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 1,
    });
    this.props.canvas.add(line).setActiveObject(line).renderAll();
    this.props.openEditShape();
  }

  addCircle = () => {
    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 30,
      fill: this.props.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 5,
    });
    this.props.canvas.add(circle).setActiveObject(circle).renderAll();
    this.props.openEditShape();
  }

  addTriangle = () => {
    const triangle = new fabric.Triangle({
      left: 200,
      top: 200,
      width: 100,
      height: 100,
      fill: this.props.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 5,
    });
    this.props.canvas.add(triangle).setActiveObject(triangle).renderAll();
    this.props.openEditShape();
  }

  addRect = () => {
    const rect = new fabric.Rect({
      left: 200,
      top: 200,
      width: 100,
      height: 80,
      fill: this.props.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 5,
    });
    this.props.canvas.add(rect).setActiveObject(rect).renderAll();
    this.props.openEditShape();
  }

  regularPolygonPoints = (sideCount, radius) => {
    const sweep = (Math.PI * 2) / sideCount;
    const cx = radius;
    const cy = radius;
    const points = [];
    for (let i = 0; i < sideCount; i++) {
      const x = cx + (radius * Math.sin(i * sweep));
      const y = cy + (radius * -Math.cos(i * sweep));
      points.push({ x, y });
    }
    return points;
  }

  addPentagon = () => {
    const points = this.regularPolygonPoints(5, 30);
    const polygon = new fabric.Polygon(points, {
      left: 200,
      top: 200,
      fill: this.props.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 5,
    });
    this.props.canvas.add(polygon).setActiveObject(polygon).renderAll();
    this.props.openEditShape();
  }

  addHexagon = () => {
    const points = this.regularPolygonPoints(6, 30);
    const polygon = new fabric.Polygon(points, {
      left: 200,
      top: 200,
      fill: this.props.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 5,
    });
    this.props.canvas.add(polygon).setActiveObject(polygon).renderAll();
    this.props.openEditShape();
  }

  starPolygonPoints = (spikeCount, outerRadius, innerRadius) => {
    const cx = outerRadius;
    const cy = outerRadius;
    const sweep = Math.PI / spikeCount;
    const points = [];
    let angle = 0;

    for (let i = 0; i < spikeCount; i++) {
      let x = cx + (Math.sin(angle) * outerRadius);
      let y = cy + (-Math.cos(angle) * outerRadius);
      points.push({ x, y });
      angle += sweep;

      x = cx + (Math.sin(angle) * innerRadius);
      y = cy + (-Math.cos(angle) * innerRadius);
      points.push({ x, y });
      angle += sweep;
    }
    return points;
  }

  addPentagram = () => {
    const points = this.starPolygonPoints(5, 50, 25);
    const polygon = new fabric.Polygon(points, {
      left: 200,
      top: 200,
      fill: this.props.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 5,
    });
    this.props.canvas.add(polygon).setActiveObject(polygon).renderAll();
    this.props.openEditShape();
  }

  render() {
    return (
      <Dropdown item icon="cube" upward button pointing="top left" closeOnChange={false}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.addCircle}>
            <Icon as={Image} src={circle} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addLine}>
            <Icon as={Image} src={line} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addTriangle}>
            <Icon as={Image} src={triangle} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addRect}>
            <Icon as={Image} src={rect} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addPentagon}>
            <Icon as={Image} src={pentagon} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addPentagram}>
            <Icon as={Image} src={pentagram} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addHexagon}>
            <Icon as={Image} src={hexagon} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Shape;
