import Link from "next/link";
import classes from './page.module.css';
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meals";
import {Suspense} from "react";

// add to layout metadata https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata = {
    title: 'All Meals',
    description: 'Browse the delicious meals shared by our vibrant community.',
};

async function MealsFetcher() {
    const meals = await getMeals();
    return <MealsGrid meals={meals}></MealsGrid>
}

export default async function MealsPage() {
    return <>
        <header className={classes.header}>
            <h1>
                Delicious meals, created{' '}
                <span className={classes.highlight}>by you</span>
            </h1>
            <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
            <p className={classes.cta}>
                <Link href="/meals/share">
                    Share Your Favorite Recipe
                </Link>
            </p>
        </header>
        <main className={classes.main}>
            <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                <MealsFetcher />
            </Suspense>
        </main>
    </>
}
