import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';


@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss']
})


export class GraphComponent implements OnInit {

    update$ = new Subject();

    data = {
        links: [],
        nodes: []
    };

    curve = shape.curveCardinal;
    currentNode: any;
    i = 0;


    constructor(
    ) { }

    ngOnInit() {}

    parseJSON(str: string) {
        const json = JSON.parse(str);
        const data = { nodes: [], links: [] };
        json.assets.forEach(node => {


            if (node.filename.length) {
                data.nodes.push({
                    id: node.id.toString(),
                    label: node.filename
                });
                if (node.parent !== node.id) {
                    data.links.push({
                        source: node.parent.toString(),
                        target: node.id.toString()
                    });
                }
            }
        });
        this.data = data;
        this.update$.next();
    }

    onNodeClick(e: any, node: any) {
        if (e.shiftKey) {
            this.addLink(this.currentNode.id, node.id);
        } else {
            this.currentNode = node;
        }
    }

    addNode(src: string) {
        this.i++;
        const newID = 'New-' + this.i.toString();
        this.data.nodes.push({
            id: newID,
            label: 'New item'
        });
        this.data.links.push({
            source: src,
            target: newID
        });
        this.update$.next();
    }

    addLink(src: string, targ: string) {
        this.data.links.push({
            source: src,
            target: targ
        });
        this.update$.next();
    }

}
