import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

export class FeatureServiceBase {
    protected featureLayer: FeatureLayer;
    protected serviceUrl: string;

    public getFeatureLayer(): FeatureLayer {
        if (this.featureLayer) {
            return this.featureLayer;
        }

        const featureLayer = new FeatureLayer({
            url: this.serviceUrl,
        });

        this.featureLayer = featureLayer;

        featureLayer.load();

        return featureLayer;
    }
}
