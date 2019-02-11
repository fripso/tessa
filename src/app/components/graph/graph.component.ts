import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';
import { GapiService } from '../../services/gapi.service';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss']
})


export class GraphComponent implements OnInit {

    data = {
        links: [],
        nodes: []
    };

    curve = shape.curveNatural;
    update$ = new Subject();

    i = 0;

    currentNode: any;
    ssid: string;
    range: string;

    constructor(
        private gapi: GapiService
    ) { }

    ngOnInit() {}

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

    getSheet() {
        this.gapi.getSheet(this.ssid, this.range).then(res => {
            this.parseJSON(res.result.values, 8, 0, 1, 13);
        });
    }

    private parseJSON(array: Array<Array<string>>, firstRow: number, idCol: number, linkCol: number, labelCol: number) {
        array.slice(firstRow).forEach(node => {
            if (node[labelCol]) {
                this.data.nodes.push({
                    id: node[idCol].substr(-4),
                    label: node[labelCol]
                });
                if (node[linkCol] !== node[idCol]) {
                    this.data.links.push({
                        source: node[linkCol].substr(-4),
                        target: node[idCol].substr(-4)
                    });
                }
            }
        });
        this.update$.next();
    }

}
