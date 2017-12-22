import React, { Component } from 'react'
import { Icon, Dropdown, Radio, Label, Image } from 'semantic-ui-react'
import { fabric } from 'fabric/dist/fabric';
import line from '../assets/images/control/line.png';
import circle from '../assets/images/control/circle.png';
import rect from '../assets/images/control/rect.png';
import star from '../assets/images/control/star.png';
import polygon from '../assets/images/control/polygon.png';

class Shape extends Component {
  state = {
    sideCount: 5,
    spikeCount: 5,
    isDrawingMode: false,
    isFill: true,
    lockUniScaling: fabric.Object.prototype.lockRotation
  }

  addLine = () => {
    let line = new fabric.Line([250, 105, 250, 205], {
      left: 200,
      top: 200,
      fill: '#ff0',
      stroke: '#ccc',
      strokeWidth: 10,
      lockUniScaling: this.state.lockUniScaling
    })
    this.props.canvas.add(line).setActiveObject(line).renderAll();
  }

  addCircle = () => {
    let circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 30,
      fill: this.state.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 10,
      lockUniScaling: this.state.lockUniScaling
    })
    this.props.canvas.add(circle).setActiveObject(circle).renderAll();
    console.log(circle.type);
  }

  addRect = () => {
    this.props.canvas.add(new fabric.Rect({
      left: 200,
      top: 200,
      width: 40,
      height: 30,
      fill: this.state.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 10,
      lockUniScaling: this.state.lockUniScaling
    })).renderAll();
  }

  regularPolygonPoints(sideCount, radius) {
    let sweep = Math.PI * 2 / sideCount;
    let cx = radius;
    let cy = radius;
    let points = [];
    for (let i = 0; i < sideCount; i++) {
      let x = cx + radius * Math.cos(i * sweep);
      let y = cy + radius * Math.sin(i * sweep);
      points.push({ x: x, y: y });
    }
    return points;
  }

  addPolygon = () => {
    let points = this.regularPolygonPoints(this.state.sideCount, 30);

    this.props.canvas.add(new fabric.Polygon(points, {
      left: 200,
      top: 200,
      fill: this.state.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 10,
      lockUniScaling: this.state.lockUniScaling
    })).renderAll();
  }

  starPolygonPoints(spikeCount, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let cx = outerRadius;
    let cy = outerRadius;
    let sweep = Math.PI / spikeCount;
    let points = [];
    let angle = 0;

    for (let i = 0; i < spikeCount; i++) {
      let x = cx + Math.cos(angle) * outerRadius;
      let y = cy + Math.sin(angle) * outerRadius;
      points.push({ x: x, y: y });
      angle += sweep;

      x = cx + Math.cos(angle) * innerRadius;
      y = cy + Math.sin(angle) * innerRadius;
      points.push({ x: x, y: y });
      angle += sweep
    }
    return points;
  }

  addStarPolygon = () => {
    let points = this.starPolygonPoints(this.state.spikeCount, 50, 25);

    this.props.canvas.add(new fabric.Polygon(points, {
      left: 200,
      top: 200,
      fill: this.state.isFill ? '#ff0' : null,
      stroke: '#ccc',
      strokeWidth: 10,
      lockUniScaling: this.state.lockUniScaling
    })).renderAll();
  }

  drawingModeToggle = () => {
    this.props.canvas.isDrawingMode = !this.props.canvas.isDrawingMode
    this.setState({
      isDrawingMode: !this.props.canvas.isDrawingMode
    })
  }

  fillToggle = () => this.setState({ isFill: !this.state.isFill })

  lockUniScalingToggle = () => this.setState({ lockUniScaling: !this.state.lockUniScaling })

  render() {
    return (
      <Dropdown item icon="cube" upward button pointing="top left" closeOnChange={false}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.addLine}>
            <Icon as={Image} src={line} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addCircle}>
            <Icon as={Image} src={circle} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addRect}>
            <Icon as={Image} src={rect} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addPolygon}>
            <Label>{this.state.sideCount}</Label>
            <Icon as={Image} src={polygon} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.addStarPolygon}>
            <Label>{this.state.spikeCount}</Label>
            <Icon as={Image} src={star} />
          </Dropdown.Item>
          <Dropdown.Item onClick={this.drawingModeToggle}>
            {this.state.isDrawingMode ? '选择模式' : '绘制模式'}
          </Dropdown.Item>
          <Dropdown.Item onClick={this.fillToggle}>
            {this.state.isFill ? '填充' : '不填充'}
          </Dropdown.Item>
          <Dropdown.Item onClick={this.lockUniScalingToggle}>
            {this.state.lockUniScaling ? '等比缩放' : '非等比缩放'}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default Shape;
