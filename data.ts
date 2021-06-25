declare module namespace {

    export interface Name {
        label: string;
    }

    export interface Uri {
        label: string;
    }

    export interface Author {
        name: Name;
        uri: Uri;
    }

    export interface ImName {
        label: string;
    }

    export interface Attributes {
        height: string;
    }

    export interface ImImage {
        label: string;
        attributes: Attributes;
    }

    export interface ImItemCount {
        label: string;
    }

    export interface Attributes2 {
        amount: string;
        currency: string;
    }

    export interface ImPrice {
        label: string;
        attributes: Attributes2;
    }

    export interface Attributes3 {
        term: string;
        label: string;
    }

    export interface ImContentType2 {
        attributes: Attributes3;
    }

    export interface Attributes4 {
        term: string;
        label: string;
    }

    export interface ImContentType {
        im:contentType: ImContentType2;
        attributes: Attributes4;
    }

    export interface Rights {
        label: string;
    }

    export interface Title {
        label: string;
    }

    export interface Attributes5 {
        rel: string;
        type: string;
        href: string;
    }

    export interface Link {
        attributes: Attributes5;
    }

    export interface Attributes6 {
        im:id: string;
    }

    export interface Id {
        label: string;
        attributes: Attributes6;
    }

    export interface Attributes7 {
        href: string;
    }

    export interface ImArtist {
        label: string;
        attributes: Attributes7;
    }

    export interface Attributes8 {
        im:id: string;
        term: string;
        scheme: string;
        label: string;
    }

    export interface Category {
        attributes: Attributes8;
    }

    export interface Attributes9 {
        label: string;
    }

    export interface ImReleaseDate {
        label: Date;
        attributes: Attributes9;
    }

    export interface Entry {
        "im:name": ImName;
        "im:image": ImImage[];
        "im:itemCount": ImItemCount;
        "im:price": ImPrice;
        "im:contentType": ImContentType;
        rights: Rights;
        title: Title;
        link: Link;
        id: Id;
        "im:artist": ImArtist;
        category: Category;
        "im:releaseDate": ImReleaseDate;
    }

    export interface Updated {
        label: Date;
    }

    export interface Rights2 {
        label: string;
    }

    export interface Title2 {
        label: string;
    }

    export interface Icon {
        label: string;
    }

    export interface Attributes10 {
        rel: string;
        type: string;
        href: string;
    }

    export interface Link2 {
        attributes: Attributes10;
    }

    export interface Id2 {
        label: string;
    }

    export interface Feed {
        author: Author;
        entry: Entry[];
        updated: Updated;
        rights: Rights2;
        title: Title2;
        icon: Icon;
        link: Link2[];
        id: Id2;
    }

    export interface RootObject {
        feed: Feed;
    }

}

