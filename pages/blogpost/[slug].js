import React, { useState, useEffect } from 'react';
import * as fs from 'fs'
import { useRouter } from 'next/router';
import styles from '../../styles/BlogPost.module.css';

const Slug = (props) => {
    const [blog, setBlog] = useState(props.myBlog);

    function createMarkup(c) {
        return { __html: c };
    }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>{blog && blog.title}</h1>
                <hr />
                {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
            </main>
        </div>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'how-to-learn-javascript' } },
            { params: { slug: 'how-to-learn-nextjs' } },
            { params: { slug: 'how-to-learn-reactjs' } }
        ],
        fallback: true
    };
}

export async function getStaticProps(context) {
    const { slug } = context.params;

    let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8")

    return {
        props: { myBlog: JSON.parse(myBlog) },
    }
}

export default Slug