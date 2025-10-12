
export interface EnergyAdapter {
    id: number;
    building_id: number;
    date: Date;
    consumption_kwh: number;
    cost: number;
    efficiency: number;
}