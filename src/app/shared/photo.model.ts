export interface Photo {
    url: string;
    title: string;
    owner_name: string;
    owner_id: string;
    date: Date;
    likes?: number;
}
