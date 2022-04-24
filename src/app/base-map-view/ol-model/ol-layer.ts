import BaseLayer from 'ol/layer/Base';


export interface OlLayer {
    getLayer(): BaseLayer;

    setVisible(value: boolean);
}
